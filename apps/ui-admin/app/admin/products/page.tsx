"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Package as PackageIcon, MoreHorizontal, Pencil, Files, Archive, Upload, Eye } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  adminGetProducts,
  adminArchiveProduct,
  adminPublishProduct,
  adminUnpublishProduct,
} from "@digital-market/api-client";
import type { Product, ProductStatus } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { toast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/format";

type StatusFilter = "all" | ProductStatus;

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const load = async () => {
    const res = await adminGetProducts(1, 200);
    if (res.data) setProducts(res.data);
  };

  useEffect(() => {
    void adminGetProducts(1, 200).then((res) => { if (res.data) setProducts(res.data); });
  }, []);

  const filtered = useMemo(
    () => (products ? (status === "all" ? products : products.filter((p) => p.status === status)) : []),
    [products, status],
  );

  const togglePublish = async (p: Product) => {
    const res =
      p.status === "PUBLISHED"
        ? await adminUnpublishProduct(p.id)
        : await adminPublishProduct(p.id);
    if (res.success) {
      toast.success(`${p.title} ${p.status === "PUBLISHED" ? "unpublished" : "published"}`);
      void load();
    } else {
      toast.error(res.message ?? "Action failed");
    }
  };

  const archive = async (p: Product) => {
    const res = await adminArchiveProduct(p.id);
    if (res.success) {
      toast.success(`${p.title} archived`);
      void load();
    } else {
      toast.error(res.message ?? "Archive failed");
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      id: "cover",
      header: "",
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="size-10 rounded-md bg-gradient-to-br from-ink to-[#3a3833] text-primary flex items-center justify-center font-semibold text-[15px]">
            {p.title.charAt(0)}
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="min-w-[220px]">
            <Link href={`/admin/products/${p.id}/edit`} className="font-medium hover:underline">
              {p.title}
            </Link>
            <div className="mt-1 text-[11.5px] text-muted tabular">{p.currency} · {p.assets.length} file{p.assets.length !== 1 ? "s" : ""}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="tabular font-semibold">{formatCurrency(row.original.price)}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const p = row.original;
        const isOpen = openMenu === p.id;
        return (
          <div className="relative flex justify-end">
            <button
              onClick={(e) => { e.stopPropagation(); setOpenMenu(isOpen ? null : p.id); }}
              className="size-8 inline-flex items-center justify-center rounded-md hover:bg-black/5"
              aria-label="Actions"
            >
              <MoreHorizontal className="size-4" />
            </button>
            {isOpen && (
              <>
                <button aria-label="Close menu" className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                <div className="absolute right-0 top-9 z-50 w-44 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                  <MenuItem icon={<Pencil className="size-3.5" />} onClick={() => router.push(`/admin/products/${p.id}/edit`)}>Edit</MenuItem>
                  <MenuItem icon={<Files className="size-3.5" />} onClick={() => router.push(`/admin/products/${p.id}/files`)}>Files</MenuItem>
                  <div className="border-t border-border-subtle" />
                  <MenuItem
                    icon={<Eye className="size-3.5" />}
                    onClick={() => { void togglePublish(p); setOpenMenu(null); }}
                  >
                    {p.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                  </MenuItem>
                  {p.status !== "ARCHIVED" && (
                    <MenuItem
                      icon={<Archive className="size-3.5" />}
                      onClick={() => { void archive(p); setOpenMenu(null); }}
                      danger
                    >
                      Archive
                    </MenuItem>
                  )}
                </div>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const statusOptions: { value: StatusFilter; label: string; count: number }[] = useMemo(() => {
    const all = products ?? [];
    return [
      { value: "all", label: "All", count: all.length },
      { value: "PUBLISHED", label: "Published", count: all.filter((p) => p.status === "PUBLISHED").length },
      { value: "DRAFT", label: "Drafts", count: all.filter((p) => p.status === "DRAFT").length },
      { value: "ARCHIVED", label: "Archived", count: all.filter((p) => p.status === "ARCHIVED").length },
    ];
  }, [products]);

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage the entire product catalog — pricing, files, and lifecycle."
        actions={
          <>
            <Button variant="secondary" leftIcon={<Upload className="size-4" />}>Import CSV</Button>
            <Link href="/admin/products/create">
              <Button leftIcon={<Plus className="size-4" />}>Add Product</Button>
            </Link>
          </>
        }
      />

      <div className="flex flex-wrap gap-1.5 mb-4">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatus(opt.value)}
            className={
              "inline-flex items-center gap-2 h-8 px-3 rounded-md text-[12.5px] font-medium border transition-colors " +
              (status === opt.value
                ? "bg-ink text-white border-ink"
                : "bg-card text-ink/80 border-border hover:border-border-strong")
            }
          >
            {opt.label}
            <span className={"tabular text-[11px] px-1.5 py-0.5 rounded " + (status === opt.value ? "bg-white/15" : "bg-surface-muted")}>
              {opt.count}
            </span>
          </button>
        ))}
      </div>

      {products === null ? (
        <Skeleton className="h-[480px]" />
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl shadow-sm">
          <EmptyState
            icon={<PackageIcon className="size-6" />}
            title="No products in this view"
            description="Create your first product to start selling."
            action={
              <Link href="/admin/products/create">
                <Button leftIcon={<Plus className="size-4" />}>Add Product</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <DataTable
          data={filtered}
          columns={columns}
          searchPlaceholder="Search products by title…"
          pageSize={10}
        />
      )}
    </div>
  );
}

function MenuItem({ icon, children, onClick, danger }: { icon: React.ReactNode; children: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-surface-hover " +
        (danger ? "text-[#ef4444]" : "text-ink")
      }
    >
      {icon}
      {children}
    </button>
  );
}
