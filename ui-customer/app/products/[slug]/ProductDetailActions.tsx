"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { LicenseType, Product } from "@digital-market/shared-types";
import { useCartStore } from "../../../store/cartStore";
import { toast } from "../../../store/toastStore";
import { formatPrice } from "../../../lib/cover";

const LICENSE_OPTIONS: { value: LicenseType; label: string; mul: number; desc: string }[] = [
  { value: "personal", label: "Personal", mul: 1, desc: "1 personal project" },
  { value: "commercial", label: "Commercial", mul: 2, desc: "1 client project" },
  { value: "extended", label: "Extended", mul: 4, desc: "5 client projects" },
  { value: "developer", label: "Developer", mul: 6, desc: "Unlimited projects" },
];

interface Props {
  product: Product;
}

export function ProductDetailActions({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [license, setLicense] = useState<LicenseType>("commercial");
  const base = product.salePrice ?? product.price;

  const onAdd = () => {
    const opt = LICENSE_OPTIONS.find((l) => l.value === license);
    const ok = addItem(
      { ...product, price: Math.round(base * (opt?.mul ?? 1) * 100) / 100, salePrice: undefined },
      license,
    );
    if (ok) toast.success("Added to cart", product.title);
    else toast.info("Already in your cart", product.title);
  };

  return (
    <div className="mt-5">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground mb-2">
        Choose license
      </p>
      <div className="grid grid-cols-2 gap-2">
        {LICENSE_OPTIONS.map((l) => {
          const active = license === l.value;
          return (
            <button
              key={l.value}
              onClick={() => setLicense(l.value)}
              className={`text-left rounded-2xl p-3 border-2 transition-colors ${
                active
                  ? "border-foreground bg-accent"
                  : "border-border bg-card hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-[13px]">{l.label}</span>
                <span className="font-black text-[13px]">
                  {formatPrice(base * l.mul)}
                </span>
              </div>
              <span className="text-[11px] font-bold text-muted-foreground">
                {l.desc}
              </span>
            </button>
          );
        })}
      </div>
      <button
        onClick={onAdd}
        className="btn-pill mt-4 h-14 w-full bg-primary text-[15px] text-primary-foreground hover:bg-primary/90"
      >
        <ShoppingBag size={16} strokeWidth={2.6} />
        Add to cart
      </button>
    </div>
  );
}
