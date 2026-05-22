export const SITE_NAME = "PROGMAN";

export const SITE_DESCRIPTION =
  "Buy digital products, projects, and IT solutions from PROGMAN with streamlined checkout and instant delivery.";

export function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  return "https://progman.store";
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
