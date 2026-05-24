import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { AppShell } from "./_components/app-shell";
import { SITE_DESCRIPTION, SITE_NAME, getSiteUrl } from "./_lib/site";
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
      window.localStorage.setItem("progman-motion", requestedMotion);
    }

    const savedMotion = window.localStorage.getItem("progman-motion");

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

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} — Digital IT Products and Solutions`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "digital products",
    "IT solutions",
    "software marketplace",
    "developer projects",
    "templates",
    SITE_NAME.toLowerCase(),
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: getSiteUrl(),
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Digital IT Products and Solutions`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Digital IT Products and Solutions`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/logo.svg`,
  };

  return (
    <html
      lang="en"
      className={outfit.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionPreferenceScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
