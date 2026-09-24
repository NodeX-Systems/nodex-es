"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

// Renders `as` and sets a `data-inview` attribute on it while it is inside
// the viewport, so children can style their revealed state with Tailwind's
// `data-inview:` / `group-data-inview:` variants. Replaces the scroll
// listeners AOS and GSAP ScrollTrigger used to attach.
//
// once=false mirrors AOS's `once: false`: the element only resets when it
// leaves through the BOTTOM of the viewport (scrolling back up), never when
// it scrolls out of the top.
export default function InView({
  as: Tag = "div",
  once = false,
  rootMargin = "0px",
  className,
  style,
  children,
  id,
}: {
  as?: ElementType;
  once?: boolean;
  rootMargin?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (entry.boundingClientRect.top > 0) {
          setInView(false);
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      data-inview={inView ? "" : undefined}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
