"use client";

import { useEffect } from "react";

// Pragmatic workaround for a single root <html> tag serving multiple
// locale sections: sets document.documentElement.lang while a non-default
// locale's layout is mounted, and restores the previous value when it
// unmounts (client-side navigation back to the default locale). Renders
// nothing.
export default function LangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = lang;
    return () => {
      root.lang = previous;
    };
  }, [lang]);

  return null;
}
