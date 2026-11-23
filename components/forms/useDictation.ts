"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Voice dictation through the browser's own Web Speech API (Google's service
// in Chrome): Nodex never receives audio, only the text that fills the input.
// The person reviews the text and sends it.
//
// The recognizer ends by itself at a pause or after a timeout, so while the
// person has not pressed stop a new session is started and the text keeps
// accumulating. The language is chosen by the caller (the API cannot detect it).

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};
type RecognitionCtor = new () => Recognition;

export type DictationError = "unsupported" | "blocked" | "nospeech";

// Sessions in a row that ended without any text before giving up.
const MAX_EMPTY_RUNS = 2;

function getCtor(): RecognitionCtor | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export const dictationSupported = () => getCtor() !== undefined;

export function useDictation() {
  const [listening, setListening] = useState(false);
  const rec = useRef<Recognition | null>(null);
  // True from `start` until the person stops (or a real error): `onend` only
  // starts a new session while it is set.
  const wanted = useRef(false);

  // Graceful stop: the words still being processed are delivered.
  const stop = useCallback(() => {
    wanted.current = false;
    try {
      rec.current?.stop();
    } catch {
      // already stopped
    }
    setListening(false);
  }, []);

  // Hard stop: nothing else is delivered. Used when the chat moves on (next
  // question, edit, reset) so late words never land in another answer.
  const cancel = useCallback(() => {
    wanted.current = false;
    const r = rec.current;
    rec.current = null;
    if (r) {
      r.onresult = null;
      r.onerror = null;
      r.onend = null;
      try {
        r.abort();
      } catch {
        // already stopped
      }
    }
    setListening(false);
  }, []);

  useEffect(() => () => cancel(), [cancel]);

  // `base` is what was already typed; the transcript is appended to it.
  const start = useCallback(
    (
      lang: string,
      base: string,
      onText: (text: string) => void,
      onError: (e: DictationError) => void,
    ) => {
      const Ctor = getCtor();
      if (!Ctor) return onError("unsupported");
      // Android Chrome repeats the whole transcript in continuous mode; there
      // each session is one phrase and the restart below chains them.
      const continuous = !/Android/i.test(navigator.userAgent);
      let latest = base;
      let emptyRuns = 0;
      wanted.current = true;

      const end = () => {
        wanted.current = false;
        rec.current = null;
        setListening(false);
      };
      const fail = (e: DictationError) => {
        end();
        onError(e);
      };
      // A long silence after some text was dictated just ends the dictation;
      // "couldn't hear that" is only for when nothing was heard at all.
      const silence = () => (latest !== base ? end() : fail("nospeech"));

      const run = () => {
        let r: Recognition;
        try {
          r = new Ctor();
        } catch {
          return fail("unsupported");
        }
        const from = latest;
        let gotText = false;
        r.lang = lang;
        r.interimResults = true;
        r.continuous = continuous;
        r.onresult = (e) => {
          gotText = true;
          const parts = Array.from(e.results, (res) => res[0].transcript);
          latest = [from, ...parts].join(" ").replace(/\s+/g, " ").trim();
          onText(latest);
        };
        r.onerror = (e) => {
          if (e.error === "aborted") return;
          if (e.error === "not-allowed" || e.error === "service-not-allowed") return fail("blocked");
          if (e.error === "no-speech") return silence();
          fail("nospeech");
        };
        r.onend = () => {
          if (rec.current !== r) return;
          rec.current = null;
          if (!wanted.current) return setListening(false);
          emptyRuns = gotText ? 0 : emptyRuns + 1;
          if (emptyRuns > MAX_EMPTY_RUNS) return silence();
          run();
        };
        rec.current = r;
        try {
          r.start();
          setListening(true);
        } catch {
          fail("unsupported");
        }
      };

      run();
    },
    [],
  );

  return { listening, start, stop, cancel };
}
