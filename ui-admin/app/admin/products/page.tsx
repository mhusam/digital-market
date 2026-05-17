"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Package as PackageIcon, MoreHorizontal, Pencil, Files, GitBranch, Archive, Upload } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  adminGetProducts,
  adminArchiveProduct,
  adminPublishProduct,
  adminGetCategories,
} from "@digital-market/api-client";
import type { Product, Category, ProductStatus } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { toast } from "@/components/ui/Toast";
import { formatCurrency, formatNumber } from "@/lib/format";

type StatusFilter = "all" | ProductStatus;

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    void Promise.all([adminGetProducts(1, 100), adminGetCategories()]).then(([p, c]) => {
      if (p.data) setProducts(p.data);
      if (c.data) setCategories(c.data);
    });
  }, []);

  const filtered = useMemo(
    () => (products ? (status === "all" ? products : products.filter((p) => p.status === status)) : []),
    [products, status],
  );

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? "—";

  const refresh = async () => {
    const res = await adminGetProducts(1, 100);
    if (res.data) setProducts(res.data);
  };

  const togglePublish = async (p: Product) => {
    const res = p.status === "published" ? await adminArchiveProduct(p.id) : await adminPublishProduct(p.id);
    if (res.success) {
      toast.success(`${p.title} ${p.status === "published" ? "archived" : "published"}`);
      void refresh();
    } else {
      toast.error(res.message ?? "Action failed");
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      id: "cover",
      header: "",
      cell: ({ row }) => {
        const p = row.original;
        const letter = p.title.charAt(0);
        return (
          <div className="size-10 rounded-md bg-gradient-to-br from-[#1B1B1B] to-[#3a3833] text-[#4F46E5] flex items-center justify-center font-semibold text-[15px]">
            {letter}
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
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span className="text-[11.5px] text-[#6b6760] tabular">v{p.version}</span>
              {p.featured && <Badge tone="violet">Featured</Badge>}
              {typeof p.salePrice === "number" && p.salePrice < p.price && <Badge tone="coral">On sale</Badge>}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      cell: ({ row }) => <span className="text-[13px]">{categoryName(row.original.categoryId)}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const p = row.original;
        return (
          <span className="tabular font-semibold">
            {p.salePrice ? (
              <>
                <span className="text-[#ef4444] mr-1.5">{formatCurrency(p.salePrice)}</span>
                <span className="line-through text-[#9b9690] text-[12px] font-normal">{formatCurrency(p.price)}</span>
              </>
            ) : (
              formatCurrency(p.price)
            )}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "salesCount",
      header: "Sales",
      cell: ({ row }) => <span className="tabular">{formatNumber(row.original.salesCount)}</span>,
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
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu(isOpen ? null : p.id);
              }}
              className="size-8 inline-flex items-center justify-center rounded-md hover:bg-black/5"
              aria-label="Actions"
            >
              <MoreHorizontal className="size-4" />
            </button>
            {isOpen && (
              <>
                <button
                  aria-label="Close menu"
                  className="fixed inset-0 z-40"
                  onClick={() => setOpenMenu(null)}
                />
                <div className="absolute right-0 top-9 z-50 w-44 bg-white border border-[#e8e5df] rounded-lg shadow-lg overflow-hidden">
                  <MenuItem icon={<Pencil className="size-3.5" />} onClick={() => router.push(`/admin/products/${p.id}/edit`)}>Edit</MenuItem>
                  <MenuItem icon={<Files className="size-3.5" />} onClick={() => router.push(`/admin/products/${p.id}/files`)}>Files</MenuItem>
                  <MenuItem icon={<GitBranch className="size-3.5" />} onClick={() => router.push(`/admin/products/${p.id}/versions`)}>Versions</MenuItem>
                  <div className="border-t border-[#eee9de]" />
                  <MenuItem
                    icon={<Archive className="size-3.5" />}
                    onClick={() => { void togglePublish(p); setOpenMenu(null); }}
                    danger={p.status === "published"}
                  >
                    {p.status === "published" ? "Archive" : "Publish"}
                  </MenuItem>
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
      { value: "published", label: "Published", count: all.filter((p) => p.status === "published").length },
      { value: "draft", label: "Drafts", count: all.filter((p) => p.status === "draft").length },
      { value: "archived", label: "Archived", count: all.filter((p) => p.status === "archived").length },
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
                ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                : "bg-white text-[#3a3833] border-[#e8e5df] hover:border-[#d8d4cc]")
            }
          >
            {opt.label}
            <span className={"tabular text-[11px] px-1.5 py-0.5 rounded " + (status === opt.value ? "bg-white/15" : "bg-[#f1ede4]")}>
              {opt.count}
            </span>
          </button>
        ))}
      </div>

      {products === null ? (
        <Skeleton className="h-[480px]" />
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#e8e5df] rounded-xl">
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
        "w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-[#fafaf7] " +
        (danger ? "text-[#ef4444]" : "text-[#1B1B1B]")
      }
    >
      {icon}
      {children}
    </button>
  );
}
