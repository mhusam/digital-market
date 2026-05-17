export interface CoverStyle {
  bg: string;
  accent: string;
  glyph: string;
  pattern: "dots" | "rings" | "grid" | "wave" | "stack" | "blocks";
}

const PALETTE: CoverStyle[] = [
  { bg: "#0EA5E9", accent: "#1B1B1B", glyph: "◆", pattern: "rings" },
  { bg: "#14B8A6", accent: "#1B1B1B", glyph: "▲", pattern: "dots" },
  { bg: "#2563EB", accent: "#F8FBFF", glyph: "●", pattern: "grid" },
  { bg: "#0284C7", accent: "#1B1B1B", glyph: "✦", pattern: "wave" },
  { bg: "#38BDF8", accent: "#F8FBFF", glyph: "◼", pattern: "stack" },
  { bg: "#93C5FD", accent: "#0F172A", glyph: "⬢", pattern: "blocks" },
  { bg: "#1B1B1B", accent: "#1E5FAF", glyph: "✺", pattern: "rings" },
];

export function coverFor(seed: string): CoverStyle {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  return PALETTE[Math.abs(h) % PALETTE.length];
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatCompact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return `${n}`;
}
