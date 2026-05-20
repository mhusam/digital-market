import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge Admin",
  description: "Forge digital marketplace — admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-content-bg text-ink font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
