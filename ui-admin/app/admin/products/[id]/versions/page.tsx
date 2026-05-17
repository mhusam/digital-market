"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, GitCommit, Plus } from "lucide-react";
import { adminGetProduct } from "@digital-market/api-client";
import type { Product } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { Badge } from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/format";

interface VersionEntry {
  id: string;
  version: string;
  changelog: string;
  fileName: string;
  date: string;
}

const initialVersions: VersionEntry[] = [
  { id: "v1", version: "2.4.1", changelog: "Patch: fix OAuth callback race condition. Improve 2FA error messages.", fileName: "auth-service-v2.4.1.zip", date: "2025-03-10T14:22:00.000Z" },
  { id: "v2", version: "2.4.0", changelog: "Add SAML SSO support. Migrate to Postgres 16. New rate limiter.", fileName: "auth-service-v2.4.0.zip", date: "2025-02-12T10:00:00.000Z" },
  { id: "v3", version: "2.3.0", changelog: "Refresh tokens now rotate. Improved JWT performance by 18%.", fileName: "auth-service-v2.3.0.zip", date: "2024-12-04T08:30:00.000Z" },
];

export default function ProductVersionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [versions, setVersions] = useState<VersionEntry[]>(initialVersions);
  const [newVersion, setNewVersion] = useState("");
  const [changelog, setChangelog] = useState("");

  useEffect(() => {
    void adminGetProduct(id).then((res) => res.data && setProduct(res.data));
  }, [id]);

  const addVersion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVersion.trim() || !changelog.trim()) {
      toast.error("Version number and changelog are required.");
      return;
    }
    setVersions((cur) => [
      {
        id: `v-${Date.now()}`,
        version: newVersion.trim(),
        changelog: changelog.trim(),
        fileName: `release-v${newVersion.trim()}.zip`,
        date: new Date().toISOString(),
      },
      ...cur,
    ]);
    setNewVersion("");
    setChangelog("");
    toast.success(`Version ${newVersion.trim()} added`);
  };

  return (
    <div>
      <PageHeader
        title="Versions"
        description={product ? `${product.title} · current ${product.version}` : "Loading…"}
        actions={
          <Link href={`/admin/products/${id}/edit`}>
            <Button variant="secondary" leftIcon={<ArrowLeft className="size-4" />}>Back to product</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          {product === null ? (
            <Skeleton className="h-72" />
          ) : (
            <ol className="relative space-y-4 before:absolute before:left-[15px] before:top-1 before:bottom-1 before:w-px before:bg-[#e8e5df]">
              {versions.map((v, i) => (
                <li key={v.id} className="relative pl-10">
                  <span className="absolute left-0 top-0 size-8 inline-flex items-center justify-center bg-white border border-[#e8e5df] rounded-full text-[#3730A3]">
                    <GitCommit className="size-4" />
                  </span>
                  <div className="bg-white border border-[#e8e5df] rounded-xl p-5">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <h3 className="text-[15px] font-semibold tabular tracking-tight">v{v.version}</h3>
                      <div className="flex items-center gap-2">
                        {i === 0 && <Badge tone="yellow">Latest</Badge>}
                        <span className="text-[12px] text-[#6b6760]">{formatDate(v.date)}</span>
                      </div>
                    </div>
                    <p className="text-[13.5px] text-[#3a3833] mt-2 leading-relaxed whitespace-pre-line">{v.changelog}</p>
                    <div className="mt-3 inline-flex items-center gap-2 text-[12px] text-[#6b6760] font-mono bg-[#faf9f5] border border-[#eee9de] px-2 py-1 rounded">
                      {v.fileName}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        <aside className="bg-white border border-[#e8e5df] rounded-xl h-fit sticky top-20">
          <div className="px-5 py-3 border-b border-[#eee9de]">
            <h2 className="text-[13px] uppercase tracking-wider font-semibold text-[#6b6760]">New version</h2>
          </div>
          <form onSubmit={addVersion} className="p-5 space-y-4">
            <Input
              label="Version number"
              value={newVersion}
              onChange={(e) => setNewVersion(e.target.value)}
              placeholder="2.5.0"
              required
            />
            <Textarea
              label="Changelog"
              value={changelog}
              onChange={(e) => setChangelog(e.target.value)}
              placeholder="What's new in this release?"
              rows={6}
              className="min-h-[140px]"
              required
            />
            <Button type="submit" className="w-full" leftIcon={<Plus className="size-4" />}>Add version</Button>
          </form>
        </aside>
      </div>
    </div>
  );
}
