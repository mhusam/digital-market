"use client";

import { useEffect, useState } from "react";
import { getDownloads, mockProducts } from "@digital-market/api-client";
import type { Download } from "@digital-market/shared-types";
import { DownloadCard } from "../../../components/account/DownloadCard";
import { Card } from "../../../components/ui/card";
import { EmptyState } from "../../../components/ui/app-empty-state";
import { Skeleton } from "../../../components/ui/skeleton";

export default function AccountDownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const response = await getDownloads();
      if (cancelled) return;
      setDownloads(response.data ?? []);
      setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Card className="p-6 md:p-7">
      <div className="max-w-2xl">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
          Downloads
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
          Reclaim the files tied to your paid orders.
        </h2>
        <p className="mt-3 text-sm font-semibold text-muted-foreground">
          Paid purchases unlock downloads. Download limits and support nudges are
          surfaced here so the customer flow mirrors the product rules in
          `docs.md`.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-[28px]" />
          ))
        ) : downloads.length > 0 ? (
          downloads.map((download) => (
            <DownloadCard
              key={download.id}
              download={download}
              product={mockProducts.find((product) => product.id === download.productId)}
            />
          ))
        ) : (
          <EmptyState
            illustration="downloads"
            title="No downloads yet"
            description="You will see downloadable files here after a paid order is attached to this account."
            ctaHref="/products"
            ctaLabel="Browse products"
          />
        )}
      </div>
    </Card>
  );
}
