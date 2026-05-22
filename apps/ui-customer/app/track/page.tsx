"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Breadcrumbs } from "../_components/breadcrumbs";
import { useToast } from "../_components/toast-provider";

const TOKEN_PATTERN = /^[A-Za-z0-9-]{8,}$/;

export default function TrackOrderPage() {
  const router = useRouter();
  const toast = useToast();
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = token.trim();
    if (!TOKEN_PATTERN.test(trimmed)) {
      toast.error("Confirmation tokens are at least 8 characters long.");
      return;
    }
    setSubmitting(true);
    router.push(`/orders/confirmation/${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="shell-container" aria-labelledby="track-title">
      <Breadcrumbs
        items={[{ href: "/", label: "Home" }, { label: "Track order" }]}
      />
      <p className="page-eyebrow">
        <span>Orders</span> Track
      </p>
      <h1 id="track-title" className="page-title compact-title">
        Find a guest order.
      </h1>
      <p className="page-copy">
        Enter the confirmation token from your order email. Signed in customers
        can see every order under{" "}
        <Link href="/account/orders" style={{ textDecoration: "underline" }}>
          My orders
        </Link>
        .
      </p>

      <form
        className="auth-card"
        onSubmit={handleSubmit}
        style={{ marginTop: 28, maxWidth: 520 }}
      >
        <label>
          Confirmation token
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="e.g. 8f3c-9e21-7a44"
            autoComplete="off"
            inputMode="text"
            required
          />
        </label>
        <button
          type="submit"
          className="button button-primary auth-submit"
          disabled={submitting}
        >
          {submitting ? "Looking up…" : "Track order"}
        </button>
      </form>
    </section>
  );
}
