// Class strings for the template's two shared heading blocks: `.heading1`
// (dark text, light background) and `.heading1-w` (light text, dark
// background). They cover the generic rules only -- many sections override
// sizes/colors/spacing, so always check the section's own CSS as well.

export const heading = {
  // span.span "eyebrow" pill
  eyebrow:
    "mb-4 inline-block rounded-[4px] bg-mint px-3 py-2 text-base leading-4 font-medium text-ink",
  h2: "text-[32px] leading-10 font-bold text-ink transition-all duration-400 lg:text-[44px] lg:leading-[54px]",
  h3: "text-[32px] leading-8 font-bold text-ink transition-all duration-400",
  h4Link:
    "inline-block text-xl leading-5 font-bold text-ink transition-all duration-400",
  p: "text-lg leading-7 font-medium text-body transition-all duration-400",
} as const;

export const headingOnDark = {
  eyebrow:
    "mb-4 inline-block rounded-[4px] bg-mint/15 px-3 py-2 text-base leading-4 font-medium text-mint",
  h2: "text-[32px] leading-10 font-bold text-white lg:text-[44px] lg:leading-[54px]",
  h4Link: "inline-block text-xl leading-5 font-bold text-white",
  p: "text-lg leading-7 font-medium text-body-light",
} as const;
