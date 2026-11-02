import LogoStrip from "@/components/home/LogoStrip";
import Media from "@/components/ui/Media";

// First screen (spec §1.6): the header, headline, subtitle, mosaic and logo
// band all fit in the viewport without scrolling. The mosaic absorbs the
// difference in height between screens.
export default function HomeHero({
  lead,
  accent,
  tail,
  subtitle,
}: {
  lead: string;
  accent: string;
  tail: string;
  subtitle: string;
}) {
  return (
    <section className="flex min-h-[max(520px,calc(100svh-var(--hh)))] flex-col px-[var(--hpad)]">
      <div className="grid items-end gap-x-[clamp(24px,calc(var(--cqi)*4),64px)] gap-y-6 pt-[clamp(28px,7svh,84px)] pb-5 min-[1000px]:grid-cols-[1fr_minmax(0,513px)]">
        <h1 className="t-h1-home max-w-[1000px]">
          {lead}
          <span className="text-accent tracking-[-0.071em]">{accent}</span>
          {tail}
        </h1>
        <p className="t-sub max-w-[465px] border-l border-line-strong pl-[clamp(20px,calc(var(--cqi)*2.4),36px)] text-body max-[999px]:ml-4 max-[700px]:ml-4">
          {subtitle}
        </p>
      </div>

      <div className="mx-[calc(-1*var(--hpad))] mt-9 grid min-h-[200px] flex-1 grid-cols-[1.618fr_1fr_0.75fr] grid-rows-[1fr_0.618fr] gap-[3px] max-[700px]:grid-cols-[1.4fr_1fr] max-[700px]:grid-rows-1">
        <Media variant="portal" priority sizes="(max-width: 700px) 60vw, 45vw" className="row-span-2 rounded-none max-[700px]:row-span-1" />
        <Media variant="head" priority sizes="(max-width: 700px) 40vw, 30vw" className="rounded-none" />
        <Media variant="hole" sizes="25vw" className="rounded-none max-[700px]:hidden" />
        <Media variant="beams" sizes="30vw" className="rounded-none max-[700px]:hidden" />
        <Media variant="tv" sizes="25vw" className="rounded-none max-[700px]:hidden" />
      </div>

      <div className="mx-[calc(-1*var(--hpad))] py-[clamp(12px,2.8svh,26px)]">
        <LogoStrip />
      </div>
    </section>
  );
}
