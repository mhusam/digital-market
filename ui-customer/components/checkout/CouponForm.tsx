"use client";

import { useState } from "react";
import { CheckCircle2, Tag, XCircle } from "lucide-react";
import { validateCoupon } from "@digital-market/api-client";
import { useCartStore } from "../../store/cartStore";

interface CouponFormProps {
  cartTotal: number;
}

export function CouponForm({ cartTotal }: CouponFormProps) {
  const couponCode = useCartStore((state) => state.couponCode);
  const apply = useCartStore((state) => state.applyDiscount);
  const clear = useCartStore((state) => state.clearDiscount);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setStatus("idle");
    try {
      const response = await validateCoupon(code.trim(), cartTotal);
      if (response.data?.valid) {
        apply(code.trim().toUpperCase(), response.data.discountAmount ?? 0);
        setStatus("ok");
        setMessage(response.data.message ?? "Coupon applied successfully.");
      } else {
        setStatus("err");
        setMessage(response.data?.message ?? "Invalid coupon");
      }
    } finally {
      setLoading(false);
    }
  };

  const onClear = () => {
    clear();
    setCode("");
    setStatus("idle");
    setMessage("");
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Tag size={16} />
        <h2 className="font-extrabold text-foreground">Coupon</h2>
      </div>

      {couponCode ? (
        <div className="flex items-center justify-between gap-3 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-primary">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span className="text-sm font-bold">{couponCode} applied</span>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-bold text-primary hover:text-primary/80"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            placeholder="WELCOME10"
            className="field-input"
          />
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="h-11 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Applying" : "Apply"}
          </button>
        </form>
      )}

      {status === "err" && message && (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-destructive">
          <XCircle size={14} />
          {message}
        </p>
      )}
      {status === "ok" && message && !couponCode && (
        <p className="mt-2 text-sm font-semibold text-primary">{message}</p>
      )}
      {!couponCode && (
        <p className="mt-3 text-sm text-muted-foreground">Try WELCOME10 for 10% off.</p>
      )}
    </div>
  );
}
