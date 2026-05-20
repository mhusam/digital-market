"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Trash2, Download, FileArchive } from "lucide-react";
import {
  adminGetProduct,
  adminUploadAsset,
  adminDeleteAsset,
  adminGetAssetDownloadUrl,
} from "@digital-market/api-client";
import type { Product, ProductAsset } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "@/components/ui/Toast";
import { formatBytes, formatDate } from "@/lib/format";
import { Table } from "@/components/ui/Table";

export default function ProductFilesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toDelete, setToDelete] = useState<ProductAsset | null>(null);
  const [deleting, setDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const res = await adminGetProduct(id);
    if (res.data) setProduct(res.data);
  };

  useEffect(() => {
    void adminGetProduct(id).then((res) => { if (res.data) setProduct(res.data); });
  }, [id]);

  const handleUpload = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setUploading(true);
    let success = 0;
    for (const file of Array.from(list)) {
      const res = await adminUploadAsset(id, file);
      if (res.success) success++;
      else toast.error(`Failed to upload ${file.name}: ${res.message}`);
    }
    if (success > 0) {
      toast.success(`Uploaded ${success} file${success > 1 ? "s" : ""}`);
      void load();
    }
    setUploading(false);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    const res = await adminDeleteAsset(toDelete.id);
    setDeleting(false);
    setToDelete(null);
    if (res.success) {
      toast.success("File deleted");
      void load();
    } else {
      toast.error(res.message ?? "Delete failed");
    }
  };

  const openDownload = async (asset: ProductAsset) => {
    try {
      const url = await adminGetAssetDownloadUrl(asset.id);
      window.open(url, "_blank");
    } catch {
      toast.error("Could not get download URL");
    }
  };

  const assets = product?.assets ?? [];

  return (
    <div>
      <PageHeader
        title={product ? `Files · ${product.title}` : "Files"}
        description="Manage downloadable assets for this product."
        actions={
          <Link href={`/admin/products/${id}/edit`}>
            <Button variant="secondary" leftIcon={<ArrowLeft className="size-4" />}>Back to product</Button>
          </Link>
        }
      />

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handleUpload(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={
          "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors " +
          (dragging ? "border-primary bg-indigo-50" : "border-border hover:border-border-strong hover:bg-surface-hover")
        }
      >
        <UploadCloud className={`size-8 ${dragging ? "text-primary" : "text-muted-light"}`} strokeWidth={1.5} />
        <div className="text-center">
          <p className="text-[14px] font-medium">{uploading ? "Uploading…" : "Drop files here or click to upload"}</p>
          <p className="text-[12.5px] text-muted mt-0.5">Any file type · No size limit</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => void handleUpload(e.target.files)}
        />
      </div>

      {/* Files table */}
      {product === null ? (
        <Skeleton className="h-[300px] mt-4" />
      ) : assets.length === 0 ? (
        <div className="panel mt-4 p-10 text-center text-muted text-[13.5px]">
          No files yet. Upload the first file above.
        </div>
      ) : (
        <div className="panel mt-4 overflow-hidden">
          <Table>
            <thead>
              <tr>
                <th>Filename</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th className="cell-numeric">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <FileArchive className="size-4 text-muted-light shrink-0" />
                      <span className="font-medium truncate max-w-[260px]">{a.filename}</span>
                    </div>
                  </td>
                  <td className="cell-muted text-[12.5px]">{a.contentType ?? "—"}</td>
                  <td className="cell-muted tabular text-[12.5px]">{a.sizeBytes ? formatBytes(a.sizeBytes) : "—"}</td>
                  <td className="cell-muted text-[12.5px]">{formatDate(a.uploadedAt)}</td>
                  <td className="cell-numeric">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => void openDownload(a)}
                        className="size-7 inline-flex items-center justify-center rounded hover:bg-surface-hover text-muted"
                        title="Download"
                      >
                        <Download className="size-3.5" />
                      </button>
                      <button
                        onClick={() => setToDelete(a)}
                        className="size-7 inline-flex items-center justify-center rounded hover:bg-[#fee2e2] text-[#ef4444]"
                        title="Delete"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete file?"
        message={`"${toDelete?.filename}" will be permanently removed. Downloads will stop working.`}
        destructive
        confirmLabel={deleting ? "Deleting…" : "Delete"}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
