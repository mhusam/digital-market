"use client";

import { Download as DownloadIcon, FileArchive } from "lucide-react";
import type { Download, Product } from "@digital-market/shared-types";
import { toast } from "../../store/toastStore";
import { Badge } from "../ui/badge";

interface DownloadCardProps {
  download: Download;
  product?: Product;
}

export function DownloadCard({ download, product }: DownloadCardProps) {
  const downloadLimit = download.downloadLimit ?? 0;
  const downloadCount = download.downloadCount ?? 0;
  const remaining = Math.max(0, downloadLimit - downloadCount);
  const onDownload = () => {
    if (remaining === 0) {
      toast.error("Download limit reached", "Contact support for help.");
      return;
    }
    toast.success("Download started", product?.title ?? "File ready");
  };

  return (
    <div className="grid gap-4 rounded-lg border border-border bg-card p-4 shadow-sm sm:grid-cols-[48px_1fr_auto] sm:items-center">
      <div className="inline-flex size-12 items-center justify-center rounded-lg bg-accent text-primary">
        <FileArchive size={20} />
      </div>
      <div className="min-w-0">
        <h3 className="truncate font-extrabold text-foreground">
          {product?.title ?? "Product file"}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge tone="blue">v{product?.version ?? "1.0.0"}</Badge>
          <span className="text-sm text-muted-foreground">
            {downloadCount}/{downloadLimit} used
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onDownload}
        disabled={remaining === 0}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        <DownloadIcon size={16} />
        Download
      </button>
    </div>
  );
}
