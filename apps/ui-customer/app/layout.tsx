import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { AppShell } from "./_components/app-shell";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const motionPreferenceScript = `
(() => {
  try {
    const params = new URLSearchParams(window.location.search);
    let requestedMotion = params.get("motion");

    if (!requestedMotion && params.get("v")?.startsWith("intro")) {
      requestedMotion = "on";
    }

    if (requestedMotion === "on" || requestedMotion === "off") {
      window.localStorage.setItem("devmarket-motion", requestedMotion);
    }

    const savedMotion = window.localStorage.getItem("devmarket-motion");

    if (savedMotion === "on") {
      document.documentElement.dataset.motion = "on";
    }

    if (savedMotion === "off") {
      document.documentElement.dataset.motion = "off";
    }
  } catch {
    document.documentElement.dataset.motion = "auto";
  }
})();
`;

export const metadata: Metadata = {
  title: "DevMarket — Curated Developer Products",
  description:
    "A minimal marketplace landing page for vetted developer tools, templates, licenses, and creator support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionPreferenceScript }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
