"use client";

import { useState } from "react";
import { Tag, CheckCircle2, XCircle } from "lucide-react";
import { validateCoupon } from "@digital-market/api-client";
import { useCartStore } from "../../store/cartStore";

interface CouponFormProps {
  cartTotal: number;
}

export function CouponForm({ cartTotal }: CouponFormProps) {
  const couponCode = useCartStore((s) => s.couponCode);
  const apply = useCartStore((s) => s.applyDiscount);
  const clear = useCartStore((s) => s.clearDiscount);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setStatus("idle");
    try {
      const res = await validateCoupon(code.trim(), cartTotal);
      if (res.data?.valid) {
        apply(code.trim().toUpperCase(), res.data.discountAmount);
        setStatus("ok");
        setMessage(res.data.message);
      } else {
        setStatus("err");
        setMessage(res.data?.message ?? "Invalid coupon");
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
    <div className="bg-white rounded-3xl p-5 border border-[#1B1B1B]/5">
      <div className="flex items-center gap-2 mb-3">
        <Tag size={15} strokeWidth={2.6} />
        <h4 className="font-black tracking-[-0.02em]">Have a coupon?</h4>
      </div>

      {couponCode ? (
        <div className="flex items-center justify-between gap-3 bg-[#14B8A6]/15 text-[#1B1B1B] rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#14B8A6]" strokeWidth={2.6} />
            <span className="font-black text-sm">{couponCode} applied</span>
          </div>
          <button
            onClick={onClear}
            className="text-[12px] font-bold text-[#0EA5E9] hover:underline underline-offset-4"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code"
            className="flex-1 h-11 px-4 rounded-2xl bg-[#EFF6FF] font-bold text-sm border-2 border-transparent focus:border-[#1B1B1B] tracking-[0.06em]"
          />
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="btn-pill bg-[#1B1B1B] text-[#1E5FAF] h-11 px-5 text-[13px] disabled:opacity-50"
          >
            {loading ? "…" : "Apply"}
          </button>
        </form>
      )}

      {status === "err" && message && (
        <p className="mt-2 flex items-center gap-1.5 text-[12px] font-bold text-[#0EA5E9]">
          <XCircle size={13} strokeWidth={2.6} />
          {message}
        </p>
      )}
      {!couponCode && (
        <p className="mt-3 text-[12px] text-[#1B1B1B]/55 font-semibold">
          Try <span className="font-black text-[#1B1B1B]">WELCOME10</span> for 10% off.
        </p>
      )}
    </div>
  );
}
