import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "../components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be located.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      className="surface-centered shell-container"
      aria-labelledby="not-found-title"
    >
      <p className="page-eyebrow">
        <span>404</span> Not found
      </p>
      <h1 id="not-found-title">This page took a wrong turn.</h1>
      <p>
        The link may be broken, the product may have been removed, or the URL
        may be mistyped. Try one of the routes below to keep moving.
      </p>
      <div className="page-actions">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/catalog">Browse catalog</Link>
        </Button>
      </div>
    </section>
  );
}
