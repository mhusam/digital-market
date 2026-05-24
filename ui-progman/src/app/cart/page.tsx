"use client";

import { useCartStore } from "@/store/cartStore";
import { Trash2, ShieldCheck, ArrowRight, Tag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, subtotal, total, discount, couponCode } = useCartStore();
  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const c = couponInput.trim().toUpperCase();
    if (!c) return;

    if (c === "SUPAPROGMAN50" || c === "PROGMANVERCEL") {
      // Set state directly in Zustand store
      useCartStore.setState({
        couponCode: c,
        discount: 15.00,
      });
      toast.success("Coupon applied! $15.00 discount credited.");
      setCouponInput("");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const handleRemoveCoupon = () => {
    useCartStore.setState({
      couponCode: null,
      discount: 0,
    });
    toast.success("Coupon removed.");
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Your Basket</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Review Digital Cart.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Verify selected boilerplates or templates, apply partner coupon codes, and finalize checkout terms.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-foreground/15 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Decorative project box */}
                  <div
                    className="size-12 rounded-xl shrink-0 flex items-center justify-center font-bold text-white text-base"
                    style={{ backgroundColor: item.coverColor || "var(--accent-electric)" }}
                  >
                    {item.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground">{item.title}</h3>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{item.licenseType || "Commercial License"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-border">
                  <span className="font-mono text-sm font-bold text-foreground">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => {
                      removeItem(item.id);
                      toast.success(`Removed ${item.title} from cart.`);
                    }}
                    className="p-2 rounded-lg border border-border bg-muted/50 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-all cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing summary */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-6 h-fit relative">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Order Summary</h3>

            <div className="space-y-3 text-xs font-semibold text-muted-foreground border-b border-border pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-foreground">${subtotal().toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[var(--accent-electric)]">
                  <span className="flex items-center gap-1.5">
                    <Tag className="size-3.5" />
                    Discount ({couponCode})
                  </span>
                  <button onClick={handleRemoveCoupon} className="font-mono font-bold hover:underline cursor-pointer">
                    -${discount.toFixed(2)} [Remove]
                  </button>
                </div>
              )}

              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="font-mono text-foreground">$0.00</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-sm border-b border-border pb-4">
              <span>Total Price</span>
              <span className="font-mono text-[var(--accent-electric)] text-lg">${total().toFixed(2)}</span>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 h-9 rounded-lg border border-border bg-muted/50 px-3 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-[var(--accent-electric)]"
              />
              <button
                type="submit"
                className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest hover:bg-primary/95 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Direct Checkout link */}
            <div className="space-y-3">
              <Link
                href="/checkout"
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-sm"
              >
                Proceed to Checkout
                <ArrowRight className="size-3.5" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>Instant signed assets download logs</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-card max-w-lg mx-auto">
          <p className="text-sm text-muted-foreground mb-6">Your shopping cart is currently empty.</p>
          <Link
            href="/products"
            className="inline-flex h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-xs items-center gap-1.5 hover:bg-primary/95 transition-all"
          >
            Browse Products
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
