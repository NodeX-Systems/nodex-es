import Image, { type StaticImageData } from "next/image";
import InView from "@/components/ui/InView";
import { cn } from "@/lib/cn";

// Replaces the GSAP `.reveal` image effect: from md up, the frame slides in
// from the left (xPercent -100 -> 0) while the image counter-slides from the
// right and scales 1.3 -> 1, 1.5s power2.out, once, as soon as the frame's
// top enters the viewport. Below md the image is shown as-is.
export default function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <InView
      once
      className={cn(
        "group/reveal relative overflow-hidden",
        "md:invisible md:inline-flex md:-translate-x-full md:transition-[translate,visibility] md:duration-1500 md:ease-[cubic-bezier(0.215,0.61,0.355,1)]",
        "md:data-inview:visible md:data-inview:translate-none",
        "motion-reduce:visible motion-reduce:translate-none motion-reduce:transition-none",
        className,
      )}
    >
      <Image
        data-reveal-item=""
        src={src}
        alt={alt}
        className={cn(
          "md:h-full md:w-full md:origin-left md:translate-x-full md:scale-130 md:object-cover md:transition-[translate,scale] md:duration-1500 md:ease-[cubic-bezier(0.215,0.61,0.355,1)]",
          "md:group-data-inview/reveal:translate-none md:group-data-inview/reveal:scale-none",
          "motion-reduce:translate-none motion-reduce:scale-none motion-reduce:transition-none",
          imgClassName,
        )}
      />
    </InView>
  );
}
