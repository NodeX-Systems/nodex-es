"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Voice dictation through the browser's own Web Speech API (Google's service
// in Chrome): Nodex never receives audio, only the text that fills the input.
// The person reviews the text and sends it.

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
};
type RecognitionCtor = new () => Recognition;

export type DictationError = "unsupported" | "blocked" | "nospeech";

function getCtor(): RecognitionCtor | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function useDictation(lang: string) {
  const [listening, setListening] = useState(false);
  const rec = useRef<Recognition | null>(null);

  const stop = useCallback(() => {
    try {
      rec.current?.stop();
    } catch {
      // already stopped
    }
    setListening(false);
  }, []);

  useEffect(() => () => stop(), [stop]);

  // `base` is what was already typed; the transcript is appended to it.
  const start = useCallback(
    (base: string, onText: (text: string) => void, onError: (e: DictationError) => void) => {
      const Ctor = getCtor();
      if (!Ctor) return onError("unsupported");
      let r: Recognition;
      try {
        r = new Ctor();
      } catch {
        return onError("unsupported");
      }
      r.lang = lang;
      r.interimResults = true;
      r.continuous = false;
      r.onresult = (e) => {
        let t = "";
        for (const res of Array.from(e.results)) t += res[0].transcript;
        onText((base ? base + " " : "") + t.trim());
      };
      r.onerror = (e) => {
        setListening(false);
        onError(
          e.error === "not-allowed" || e.error === "service-not-allowed" ? "blocked" : "nospeech",
        );
      };
      r.onend = () => {
        setListening(false);
        rec.current = null;
      };
      rec.current = r;
      try {
        r.start();
        setListening(true);
      } catch {
        rec.current = null;
        onError("unsupported");
      }
    },
    [lang],
  );

  return { listening, start, stop };
}
