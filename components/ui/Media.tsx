import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";
import beams from "@/public/assets/img/photos/beams.jpg";
import cyborg from "@/public/assets/img/photos/cyborg.jpg";
import glitch from "@/public/assets/img/photos/glitch.jpg";
import globe from "@/public/assets/img/photos/globe.jpg";
import head from "@/public/assets/img/photos/head.jpg";
import hole from "@/public/assets/img/photos/hole.jpg";
import map from "@/public/assets/img/photos/map.jpg";
import portal from "@/public/assets/img/photos/portal.jpg";
import scan from "@/public/assets/img/photos/scan.jpg";
import tv from "@/public/assets/img/photos/tv.jpg";

// The site's photographic imagery (object-fit: cover, no filters). The files
// come from the prototype bundle and were approved for use as they are by the
// project owner on 2 Nov 2026. To swap one, replace the file in
// public/assets/img/photos keeping its name and a similar proportion.
const IMAGES = { beams, cyborg, glitch, globe, head, hole, map, portal, scan, tv } satisfies Record<string, StaticImageData>;

export type MediaName = keyof typeof IMAGES;
/** @deprecated kept so older imports keep compiling; use MediaName. */
export type MediaVariant = MediaName;

// Framing (object-position) where the design does not centre the image.
const POSITION: Partial<Record<MediaName, string>> = {
  beams: "50% 40%",
  glitch: "50% 35%",
  globe: "45% 50%",
};

export default function Media({
  variant = "head",
  alt = "",
  position,
  priority,
  sizes = "(max-width: 700px) 100vw, 50vw",
  imgClassName,
  className,
}: {
  variant?: MediaName;
  /** Empty for decorative images (the default). */
  alt?: string;
  position?: string;
  priority?: boolean;
  sizes?: string;
  imgClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-panel",
        // <Image fill> needs a positioned parent; callers may place it
        // absolutely themselves.
        !className?.includes("absolute") && "relative",
        className,
      )}
    >
      <Image
        src={IMAGES[variant]}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectPosition: position ?? POSITION[variant] }}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
