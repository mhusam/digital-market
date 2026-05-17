"use client";

import { Download as DownloadIcon, FileArchive } from "lucide-react";
import type { Download, Product } from "@digital-market/shared-types";
import { Badge } from "../ui/Badge";
import { toast } from "../../store/toastStore";

interface DownloadCardProps {
  download: Download;
  product?: Product;
}

export function DownloadCard({ download, product }: DownloadCardProps) {
  const remaining = Math.max(0, download.downloadLimit - download.downloadCount);
  const onDownload = () => {
    if (remaining === 0) {
      toast.error("Download limit reached", "Contact support for help.");
      return;
    }
    toast.success("Download started", product?.title ?? "File ready");
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-[#1B1B1B]/5 shadow-[0_8px_24px_-14px_rgba(17,24,39,0.18)] flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-[#EAF3FF] inline-flex items-center justify-center flex-shrink-0">
        <FileArchive size={20} strokeWidth={2.4} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-black text-[16px] tracking-[-0.02em] truncate">
          {product?.title ?? "Product file"}
        </h4>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <Badge tone="warn">v{product?.version ?? "1.0.0"}</Badge>
          <span className="text-[12px] font-bold text-[#1B1B1B]/60">
            {download.downloadCount}/{download.downloadLimit} downloads used
          </span>
        </div>
      </div>
      <button
        onClick={onDownload}
        disabled={remaining === 0}
        className="btn-pill bg-[#1B1B1B] text-[#1E5FAF] h-11 px-5 text-sm disabled:opacity-40"
      >
        <DownloadIcon size={14} strokeWidth={2.6} />
        Download
      </button>
    </div>
  );
}
