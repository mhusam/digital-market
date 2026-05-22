"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "../components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      console.error("App error boundary:", error);
    }
  }, [error]);

  return (
    <section
      className="surface-centered shell-container"
      aria-labelledby="error-title"
      role="alert"
    >
      <p className="page-eyebrow">
        <span>500</span> Unexpected error
      </p>
      <h1 id="error-title">Something broke on our side.</h1>
      <p>
        The page could not finish loading. Try again, head back to the catalog,
        or contact support if the issue keeps happening.
      </p>
      {error.digest ? (
        <p style={{ fontSize: 12, opacity: 0.6 }}>Reference: {error.digest}</p>
      ) : null}
      <div className="page-actions">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="secondary">
          <Link href="/catalog">Browse catalog</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/contact">Contact support</Link>
        </Button>
      </div>
    </section>
  );
}
