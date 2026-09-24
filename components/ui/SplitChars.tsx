"use client";

import { Fragment } from "react";

// One inline-block span per character (words kept unbreakable), each with a
// 20ms-staggered transition delay. Styled by SplitText through the
// `[data-reveal-item]` descendant selector on `className`.
export default function SplitChars({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span aria-hidden="true" className={className}>
      {words.map((word, w) => (
        <Fragment key={w}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, c) => (
              <span
                key={c}
                data-reveal-item=""
                style={{ transitionDelay: `${charIndex++ * 20}ms` }}
              >
                {char}
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
