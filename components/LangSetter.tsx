"use client";

import { useEffect } from "react";

// Pragmatic workaround for a single root <html> tag serving multiple
// locale sections: sets document.documentElement.lang on mount for
// non-default locales. Renders nothing.
export default function LangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
