"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, UploadCloud, FileArchive, Trash2, Star, FileCode } from "lucide-react";
import { adminGetProduct } from "@digital-market/api-client";
import type { Product } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "@/components/ui/Toast";
import { formatBytes, formatDate } from "@/lib/format";

interface MockFile {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  version: string;
  uploadedAt: string;
  isMain: boolean;
}

const initialFiles: MockFile[] = [
  { id: "f1", fileName: "auth-service-v2.4.1.zip", fileSize: 12_485_120, mimeType: "application/zip", version: "2.4.1", uploadedAt: "2025-03-10T14:22:00.000Z", isMain: true },
  { id: "f2", fileName: "documentation.pdf", fileSize: 2_415_800, mimeType: "application/pdf", version: "2.4.1", uploadedAt: "2025-03-10T14:22:00.000Z", isMain: false },
  { id: "f3", fileName: "auth-service-v2.4.0.zip", fileSize: 12_290_001, mimeType: "application/zip", version: "2.4.0", uploadedAt: "2025-02-12T10:00:00.000Z", isMain: false },
];

export default function ProductFilesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [files, setFiles] = useState<MockFile[]>(initialFiles);
  const [dragging, setDragging] = useState(false);
  const [toDelete, setToDelete] = useState<MockFile | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void adminGetProduct(id).then((res) => res.data && setProduct(res.data));
  }, [id]);

  const handleUpload = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const added: MockFile[] = Array.from(list).map((f, i) => ({
      id: `f-new-${Date.now()}-${i}`,
      fileName: f.name,
      fileSize: f.size,
      mimeType: f.type || "application/octet-stream",
      version: product?.version ?? "1.0.0",
      uploadedAt: new Date().toISOString(),
      isMain: false,
    }));
    setFiles((cur) => [...added, ...cur]);
    toast.success(`Uploaded ${added.length} file${added.length > 1 ? "s" : ""}`);
  };

  const toggleMain = (fid: string) => {
    setFiles((cur) => cur.map((f) => ({ ...f, isMain: f.id === fid })));
    toast.success("Main file updated");
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    setFiles((cur) => cur.filter((f) => f.id !== toDelete.id));
    toast.success(`Removed ${toDelete.fileName}`);
    setToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Files"
        description={product ? `${product.title} · ${files.length} files` : "Loading…"}
        actions={
          <Link href={`/admin/products/${id}/edit`}>
            <Button variant="secondary" leftIcon={<ArrowLeft className="size-4" />}>Back to product</Button>
          </Link>
        }
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleUpload(e.dataTransfer.files);
        }}
        className={
          "relative border-2 border-dashed rounded-xl p-10 text-center transition-colors " +
          (dragging ? "border-[#4F46E5] bg-[#eef2ff]/40" : "border-[#d8d4cc] bg-white")
        }
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <div className="size-12 mx-auto bg-[#1B1B1B] text-[#4F46E5] rounded-xl inline-flex items-center justify-center">
          <UploadCloud className="size-6" />
        </div>
        <h3 className="text-[15px] font-semibold mt-3">Drop files here or click to upload</h3>
        <p className="text-[12.5px] text-[#6b6760] mt-1">ZIP, PDF, or any binary up to 500 MB.</p>
        <Button className="mt-4" onClick={() => inputRef.current?.click()}>Choose files</Button>
      </div>

      {product === null ? (
        <Skeleton className="h-72 mt-6" />
      ) : (
        <div className="mt-6 bg-white border border-[#e8e5df] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-wide text-[#6b6760] bg-[#faf9f5]">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold">Name</th>
                <th className="text-left px-4 py-2.5 font-semibold">Size</th>
                <th className="text-left px-4 py-2.5 font-semibold">Type</th>
                <th className="text-left px-4 py-2.5 font-semibold">Version</th>
                <th className="text-left px-4 py-2.5 font-semibold">Uploaded</th>
                <th className="text-right px-4 py-2.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => (
                <tr key={f.id} className="border-t border-[#f3efe6] hover:bg-[#fbfaf6]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="size-8 inline-flex items-center justify-center bg-[#eef2ff] text-[#3730A3] rounded">
                        {f.mimeType.includes("zip") ? <FileArchive className="size-4" /> : <FileCode className="size-4" />}
                      </span>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {f.fileName}
                          {f.isMain && <Badge tone="yellow">Main</Badge>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 tabular text-[#3a3833]">{formatBytes(f.fileSize)}</td>
                  <td className="px-4 py-3 text-[12.5px] text-[#6b6760]">{f.mimeType.split("/")[1]}</td>
                  <td className="px-4 py-3 tabular">{f.version}</td>
                  <td className="px-4 py-3 text-[#6b6760]">{formatDate(f.uploadedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => toggleMain(f.id)}
                        className="size-8 inline-flex items-center justify-center rounded-md hover:bg-black/5"
                        aria-label="Set as main file"
                        title="Set as main file"
                      >
                        <Star className={"size-4 " + (f.isMain ? "fill-[#4F46E5] text-[#4F46E5]" : "text-[#6b6760]")} />
                      </button>
                      <button
                        onClick={() => setToDelete(f)}
                        className="size-8 inline-flex items-center justify-center rounded-md hover:bg-[#fee2e2] text-[#ef4444]"
                        aria-label="Delete file"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete file?"
        message={`Remove "${toDelete?.fileName}"? This cannot be undone.`}
        destructive
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
