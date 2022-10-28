import { it, expect } from "vitest";
import { generateClassNamesTsCode } from "../../../../src/bin/css_to_ts/classNames";

it("Generation of TS code for fr class names", () => {
    const input = `
.fr-text--light {
  font-weight: 300 !important;
}

.fr-text--xl,
.fr-text--lead {
  font-size: 1.25rem !important;
  line-height: 2rem !important;
  margin: var(--text-spacing);
}

.fr-grid-row--gutters > [class^=fr-col-],
.fr-grid-row--gutters > [class*=" fr-col-"],
.fr-grid-row--gutters > .fr-col {
  padding: 0.5rem;
}

@media (min-width: 36em) { }
@media (min-width: 48em) { }
@media (min-width: 62em) { }
@media (min-width: 78em) { }

`;

    const expected = `
export const frClassNames= [
    ".fr-text--light",
    ".fr-text--xl",
    ".fr-text--lead",
    ".fr-grid-row--gutters"
] as const;

export type FrClassName = typeof frClassNames[number];
`.replace(/^\n/, "");

    const got = generateClassNamesTsCode(input);

    expect(got).toBe(expected);
});
