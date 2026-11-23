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

// One dictation, from pressing the mic until it ends; it may span several
// recognizer sessions.
type Dictation = {
  lang: string;
  base: string; // text already in the box when the dictation started
  latest: string; // base plus everything recognized so far
  emptyRuns: number; // sessions in a row that ended without any text
  onText: (text: string) => void;
  onError: (e: DictationError) => void;
};

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
  const dict = useRef<Dictation | null>(null);
  // True from `start` until the person stops (or a real error): a session that
  // ends only starts the next one while it is set.
  const wanted = useRef(false);

  const end = useCallback(() => {
    wanted.current = false;
    rec.current = null;
    setListening(false);
  }, []);

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
  // question, edit, reset, language change) or the person types, so late words
  // never land in another answer or over typed text.
  const cancel = useCallback(() => {
    wanted.current = false;
    dict.current = null;
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

  // Starts one recognizer session for the current dictation. `restart` is true
  // when it continues a dictation after the previous session ended.
  const run = useCallback(
    function session(restart: boolean) {
      const d = dict.current;
      const Ctor = getCtor();
      if (!d || !Ctor) return;
      const fail = (e: DictationError) => {
        end();
        d.onError(e);
      };
      // Silence after some text was dictated just ends the dictation; "couldn't
      // hear that" is only for when nothing was heard at all. A restart that
      // fails is treated the same way (it is not "unsupported": it worked).
      const quiet = () => (d.latest !== d.base ? end() : fail("nospeech"));

      let r: Recognition;
      try {
        r = new Ctor();
      } catch {
        return restart ? quiet() : fail("unsupported");
      }
      const from = d.latest;
      let gotText = false;
      r.lang = d.lang;
      r.interimResults = true;
      // Android Chrome repeats the whole transcript in continuous mode; there
      // each session is one phrase and the restart chains them.
      r.continuous = !/Android/i.test(navigator.userAgent);
      r.onresult = (e) => {
        gotText = true;
        const parts = Array.from(e.results, (res) => res[0].transcript);
        d.latest = [from, ...parts].join(" ").replace(/\s+/g, " ").trim();
        d.onText(d.latest);
      };
      r.onerror = (e) => {
        if (e.error === "aborted") return;
        if (e.error === "not-allowed" || e.error === "service-not-allowed") return fail("blocked");
        if (e.error === "no-speech") return quiet();
        fail("nospeech");
      };
      r.onend = () => {
        if (rec.current !== r) return;
        rec.current = null;
        if (!wanted.current) return setListening(false);
        d.emptyRuns = gotText ? 0 : d.emptyRuns + 1;
        if (d.emptyRuns > MAX_EMPTY_RUNS) return quiet();
        session(true);
      };
      rec.current = r;
      try {
        r.start();
        setListening(true);
      } catch {
        if (restart) quiet();
        else fail("unsupported");
      }
    },
    [end],
  );

  // `base` is what was already typed; the transcript is appended to it.
  const start = useCallback(
    (
      lang: string,
      base: string,
      onText: (text: string) => void,
      onError: (e: DictationError) => void,
    ) => {
      if (!getCtor()) return onError("unsupported");
      const d = dict.current;
      // Mic pressed again while the stopped session is still delivering its
      // last words: carry on with the same dictation so those words are kept.
      // (Typing or a language change would have cancelled it.)
      if (rec.current && d && d.lang === lang) {
        Object.assign(d, { onText, onError, emptyRuns: 0 });
        wanted.current = true;
        setListening(true);
        return;
      }
      cancel();
      dict.current = { lang, base, latest: base, emptyRuns: 0, onText, onError };
      wanted.current = true;
      run(false);
    },
    [cancel, run],
  );

  return { listening, start, stop, cancel };
}
