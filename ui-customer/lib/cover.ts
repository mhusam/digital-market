export interface CoverStyle {
  bg: string;
  accent: string;
}

const PALETTE: CoverStyle[] = [
  { bg: "#eef6ff", accent: "#0f5bd7" },
  { bg: "#ecfdf5", accent: "#0f766e" },
  { bg: "#f1f5f9", accent: "#0f172a" },
  { bg: "#eff6ff", accent: "#1d4ed8" },
  { bg: "#f0f9ff", accent: "#0369a1" },
  { bg: "#f8fafc", accent: "#475569" },
];

export function coverFor(seed: string): CoverStyle {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) | 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatCompact(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  return `${value}`;
}
