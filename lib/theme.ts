/**
 * ArkAgent design tokens — "Terminal Lime".
 * Ported verbatim from the Claude Design prototype (ArkAgent.dc.html) so the
 * implementation stays pixel-true to the source. Every screen imports from here
 * rather than hard-coding hex values.
 */

export const c = {
  // surfaces
  bg: "#0B0D10", // page background / text-on-lime ink
  panel: "#0E1116", // raised panel
  panelDeep: "#0B0D10", // recessed input wells inside panels
  hover: "#12161D", // card hover background

  // hairlines / borders
  line: "#1B212C", // structural hairline (grid gaps, dividers)
  lineSoft: "#161B23", // faint row divider in lists/feeds
  border: "#232B38", // default control/card border
  borderStrong: "#2A3342", // secondary button / stronger border
  borderMute: "#3A4452", // hover border for muted controls

  // lime accent
  lime: "#D8FF3E",
  limeHover: "#E9FF7A",
  limeWash: "#11150C", // selected/active lime-tinted background
  limeWash2: "#161B0F", // hover over a lime-tinted card
  limeBorder: "#3A4520", // border around lime-tinted surfaces

  // text ramp
  ink: "#0B0D10", // text/icon on a lime fill
  text: "#E8ECF1",
  text2: "#C6CEDA",
  muted: "#9AA3B2",
  faint: "#525B6B",

  // status
  green: "#4ADE80",
  greenWash: "#0F1A14",
  greenBorder: "#1E3A2A",
  amber: "#FBBF24",
  red: "#F87171",
  redWash: "#1A0F11",
  redBorder: "#3A2328",
  blue: "#6AA6FF",

  // brand / third-party
  stripe: "#635BFF",
  stripeHover: "#7A73FF",
  alipay: "#1677FF",
  navSelected: "#1A202B", // selected sidebar nav row

  // directions screen (light theme sketches)
  dirBg: "#E9EAEC",
  dirInk: "#1A1D22",
  dirMuted: "#6B7280",
  ivory: "#F6F2EA",
  ivoryInk: "#1C1A16",
  midnight: "#0A0F1E",
  midnightBlue: "#4F7CFF",
} as const;

/** Per-role accent hue, keyed by role id. */
export const roleHue: Record<string, string> = {
  prospector: "#D8FF3E",
  salesmkt: "#E8804F",
  admin: "#F472B6",
  hr: "#4FD1C5",
  support: "#6AA6FF",
  legal: "#94A3B8",
  content: "#A78BFA",
  opc: "#FBBF24",
};

/**
 * Font stacks. The CSS variables are wired by next/font in app/layout.tsx; the
 * literal fallbacks keep things sane if a variable ever fails to load.
 */
export const font = {
  space: "var(--font-space), 'Space Grotesk', sans-serif",
  sans: "var(--font-sans), 'Instrument Sans', sans-serif",
  mono: "var(--font-mono), 'IBM Plex Mono', monospace",
  serif: "var(--font-serif), 'Newsreader', serif",
} as const;

/** The faint 52px engineering grid used on the hero and the auth panel. */
export const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
  backgroundSize: "52px 52px",
} as const;
