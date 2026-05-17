import type { Metadata, Viewport } from "next";
import { DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { BgShapes } from "../components/layout/BgShapes";
import { ToastContainer } from "../components/ui/Toast";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forge — Premium Digital Products",
  description:
    "Forge is the marketplace for premium digital products. Curated themes, plugins, UI kits, and code, ready to download.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <BgShapes />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
