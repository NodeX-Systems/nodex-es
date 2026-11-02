// Class names for the type scale defined as @utility rules in globals.css
// (spec §1.2). Combine with colour utilities at the call site.
export const type = {
  homeH1: "t-h1-home",
  h1: "t-h1",
  contactH1: "t-h1-contact",
  h2: "t-h2",
  h2b: "t-h2b",
  close: "t-h2-close",
  format: "t-h2-format",
  h2s: "t-h2s",
  legalH2: "t-h2-legal",
  caseH3: "t-h3-case",
  step: "t-step",
  pcard: "t-pcard",
  lead: "t-lead text-body",
  sub: "t-sub text-body",
  tag: "t-tag",
  body: "text-[17px] leading-[1.55] text-body",
  small: "text-[15px] leading-[1.55] text-body",
} as const;

export type TypeKey = keyof typeof type;
