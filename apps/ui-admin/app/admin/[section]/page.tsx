"use client";

import { use, useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  adminCustomersReport,
  adminGetAuditLogs,
  adminGetCoupons,
  adminGetCustomers,
  adminGetPages,
  adminGetRoles,
  adminGetSettings,
  adminGetTickets,
  adminGetUsers,
  adminProductsReport,
  adminSalesReport,
} from "@digital-market/api-client";
import type {
  AuditLog,
  Coupon,
  Review,
  Settings,
  StaticPage,
  SupportTicket,
  User,
} from "@digital-market/shared-types";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton, TableSkeleton } from "@/components/ui/LoadingSkeleton";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AreaChartCard, BarChartCard, ChartCard, LineChartCard } from "@/components/ui/Chart";
import { formatCurrency, formatDate, formatDateTime, formatNumber } from "@/lib/format";

const SECTION_META = {
  reviews: {
    title: "Reviews",
    description: "Moderate reviews, inspect sentiment, and track verified purchase feedback across the catalog.",
  },
  files: {
    title: "File Library",
    description: "Browse the assets and delivery bundles attached to your current product catalog.",
  },
  customers: {
    title: "Customers",
    description: "Monitor customer status, account recency, and order activity across the marketplace.",
  },
  coupons: {
    title: "Coupons",
    description: "Review promotional codes, discount rules, and current usage health.",
  },
  "download-logs": {
    title: "Download Logs",
    description: "Track recent product delivery activity and remaining download allowance.",
  },
  blog: {
    title: "Blog",
    description: "Manage the editorial queue and publication cadence for marketplace content.",
  },
  pages: {
    title: "Pages",
    description: "Review and manage static marketing and policy pages served from the mock CMS.",
  },
  support: {
    title: "Support Tickets",
    description: "Stay on top of support load, ticket priority, and response ownership.",
  },
  reports: {
    title: "Reports",
    description: "Explore revenue, product, and customer trendlines using the seeded marketplace analytics.",
  },
  settings: {
    title: "Settings",
    description: "Inspect grouped platform configuration values and current public/private exposure.",
  },
  users: {
    title: "Admin Users",
    description: "Review admin access, team roles, and operational account coverage.",
  },
  roles: {
    title: "Roles",
    description: "Reference the current admin role model and responsibility boundaries.",
  },
  "audit-logs": {
    title: "Audit Logs",
    description: "Inspect key authentication and content events recorded in the admin session log.",
  },
} as const;

type SectionKey = keyof typeof SECTION_META;

type ReviewRow = Review & {
  productTitle: string;
  customerName: string;
};

type FileRow = {
  id: string;
  productTitle: string;
  slug: string;
  version: string;
  status: string;
  assetCount: number;
  updatedAt: string;
  demoUrl?: string;
};

type CustomerRow = User & {
  orderCount: number;
  totalSpent: number;
};

type DownloadLogRow = {
  id: string;
  productTitle: string;
  customerName: string;
  orderCode: string;
  downloadCount: number;
  remaining: number;
  createdAt: string;
  fileId: string;
};

type BlogRow = {
  id: string;
  title: string;
  slug: string;
  status: string;
  readingTimeMinutes: number;
  publishedAt?: string;
  createdAt: string;
  tags: string;
};

type RoleRow = {
  role: string;
  label: string;
  description: string;
};

type ReportsPayload = {
  sales: { month: string; revenue: number; orders: number }[];
  products: { productId: string; title: string; salesCount: number; revenue: number }[];
  customers: { month: string; newCustomers: number; totalCustomers: number }[];
};

type SectionState =
  | { section: SectionKey; kind: "reviews"; data: ReviewRow[] }
  | { section: SectionKey; kind: "files"; data: FileRow[] }
  | { section: SectionKey; kind: "customers"; data: CustomerRow[] }
  | { section: SectionKey; kind: "coupons"; data: Coupon[] }
  | { section: SectionKey; kind: "download-logs"; data: DownloadLogRow[] }
  | { section: SectionKey; kind: "blog"; data: BlogRow[] }
  | { section: SectionKey; kind: "pages"; data: StaticPage[] }
  | { section: SectionKey; kind: "support"; data: SupportTicket[] }
  | { section: SectionKey; kind: "reports"; data: ReportsPayload }
  | { section: SectionKey; kind: "settings"; data: Settings[] }
  | { section: SectionKey; kind: "users"; data: User[] }
  | { section: SectionKey; kind: "roles"; data: RoleRow[] }
  | { section: SectionKey; kind: "audit-logs"; data: AuditLog[] };

export default function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = use(params);
  const sectionKey = section as SectionKey;
  const meta = SECTION_META[sectionKey];
  const [loaded, setLoaded] = useState<SectionState | null>(null);

  useEffect(() => {
    if (!meta) return;
    let active = true;

    const load = async () => {
      let next: SectionState | null = null;

      switch (sectionKey) {
        case "reviews": {
          next = { section: sectionKey, kind: "reviews", data: [] };
          break;
        }
        case "files": {
          next = { section: sectionKey, kind: "files", data: [] };
          break;
        }
        case "customers": {
          const res = await adminGetCustomers(1, 200);
          next = {
            section: sectionKey,
            kind: "customers",
            data: (res.data ?? []).map((customer) => ({
              ...customer,
              orderCount: 0,
              totalSpent: 0,
            })),
          };
          break;
        }
        case "coupons": {
          const res = await adminGetCoupons();
          next = { section: sectionKey, kind: "coupons", data: res.data ?? [] };
          break;
        }
        case "download-logs": {
          next = { section: sectionKey, kind: "download-logs", data: [] };
          break;
        }
        case "blog": {
          next = { section: sectionKey, kind: "blog", data: [] };
          break;
        }
        case "pages": {
          const res = await adminGetPages();
          next = { section: sectionKey, kind: "pages", data: res.data ?? [] };
          break;
        }
        case "support": {
          const res = await adminGetTickets(1, 200);
          next = { section: sectionKey, kind: "support", data: res.data ?? [] };
          break;
        }
        case "reports": {
          const [sales, products, customers] = await Promise.all([
            adminSalesReport(),
            adminProductsReport(),
            adminCustomersReport(),
          ]);
          next = {
            section: sectionKey,
            kind: "reports",
            data: {
              sales: sales.data ?? [],
              products: products.data ?? [],
              customers: customers.data ?? [],
            },
          };
          break;
        }
        case "settings": {
          const res = await adminGetSettings();
          next = { section: sectionKey, kind: "settings", data: res.data ?? [] };
          break;
        }
        case "users": {
          const res = await adminGetUsers();
          next = { section: sectionKey, kind: "users", data: res.data ?? [] };
          break;
        }
        case "roles": {
          const res = await adminGetRoles();
          next = { section: sectionKey, kind: "roles", data: res.data ?? [] };
          break;
        }
        case "audit-logs": {
          const res = await adminGetAuditLogs(1, 200);
          next = { section: sectionKey, kind: "audit-logs", data: res.data ?? [] };
          break;
        }
      }

      if (active && next) {
        setLoaded(next);
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, [meta, sectionKey]);

  if (!meta) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10">
        <h1 className="text-[24px] font-semibold tracking-tight">Unknown admin section</h1>
        <p className="mt-2 text-[14px] text-muted">This admin route does not map to a configured section.</p>
      </div>
    );
  }

  const isLoading = !loaded || loaded.section !== sectionKey;

  return (
    <div>
      <PageHeader title={meta.title} description={meta.description} />
      {isLoading ? <SectionSkeleton section={sectionKey} /> : <SectionContent state={loaded} />}
    </div>
  );
}

function SectionContent({ state }: { state: SectionState }) {
  switch (state.kind) {
    case "reviews":
      return <ReviewsSection rows={state.data} />;
    case "files":
      return <FilesSection rows={state.data} />;
    case "customers":
      return <CustomersSection rows={state.data} />;
    case "coupons":
      return <CouponsSection rows={state.data} />;
    case "download-logs":
      return <DownloadLogsSection rows={state.data} />;
    case "blog":
      return <BlogSection rows={state.data} />;
    case "pages":
      return <PagesSection rows={state.data} />;
    case "support":
      return <SupportSection rows={state.data} />;
    case "reports":
      return <ReportsSection data={state.data} />;
    case "settings":
      return <SettingsSection rows={state.data} />;
    case "users":
      return <UsersSection rows={state.data} />;
    case "roles":
      return <RolesSection rows={state.data} />;
    case "audit-logs":
      return <AuditLogsSection rows={state.data} />;
  }
}

function ReviewsSection({ rows }: { rows: ReviewRow[] }) {
  const columns: ColumnDef<ReviewRow>[] = [
    { accessorKey: "productTitle", header: "Product" },
    { accessorKey: "customerName", header: "Customer" },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => <span className="font-semibold">{row.original.rating}/5</span>,
    },
    {
      accessorKey: "title",
      header: "Review",
      cell: ({ row }) => (
        <div className="min-w-[220px]">
          <div className="font-medium">{row.original.title}</div>
          <div className="mt-0.5 line-clamp-2 text-[12px] text-muted">{row.original.body}</div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "helpfulCount",
      header: "Helpful",
      cell: ({ row }) => <span className="tabular">{formatNumber(row.original.helpfulCount)}</span>,
    },
  ];

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search reviews, customers, or products…" pageSize={12} />;
}

function FilesSection({ rows }: { rows: FileRow[] }) {
  const columns: ColumnDef<FileRow>[] = [
    { accessorKey: "productTitle", header: "Product" },
    {
      accessorKey: "slug",
      header: "Bundle",
      cell: ({ row }) => <span className="font-mono text-[12px] text-muted">/{row.original.slug}</span>,
    },
    { accessorKey: "version", header: "Version", cell: ({ row }) => <span className="tabular">v{row.original.version}</span> },
    { accessorKey: "assetCount", header: "Assets", cell: ({ row }) => <span className="tabular">{row.original.assetCount}</span> },
    { accessorKey: "updatedAt", header: "Updated", cell: ({ row }) => formatDate(row.original.updatedAt) },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  ];

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search file bundles…" pageSize={12} />;
}

function CustomersSection({ rows }: { rows: CustomerRow[] }) {
  const columns: ColumnDef<CustomerRow>[] = [
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-[12px] text-muted">{row.original.email}</div>
        </div>
      ),
    },
    { accessorKey: "role", header: "Role", cell: ({ row }) => <span className="capitalize text-[12.5px]">{row.original.role.toLowerCase()}</span> },
    { accessorKey: "createdAt", header: "Joined", cell: ({ row }) => formatDate(row.original.createdAt) },
  ];

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search customers…" pageSize={12} />;
}

function CouponsSection({ rows }: { rows: Coupon[] }) {
  const columns: ColumnDef<Coupon>[] = [
    { accessorKey: "code", header: "Code", cell: ({ row }) => <span className="font-mono font-semibold">{row.original.code}</span> },
    {
      accessorKey: "type",
      header: "Offer",
      cell: ({ row }) => (
        <span>
          {row.original.type === "percentage" ? `${row.original.value}% off` : formatCurrency(row.original.value)}
        </span>
      ),
    },
    {
      accessorKey: "usageCount",
      header: "Usage",
      cell: ({ row }) => (
        <span className="tabular">
          {row.original.usageCount}
          {row.original.usageLimit ? ` / ${row.original.usageLimit}` : ""}
        </span>
      ),
    },
    {
      accessorKey: "minOrderAmount",
      header: "Rules",
      cell: ({ row }) => (
        <div className="text-[12px] text-muted">
          <div>{row.original.minOrderAmount ? `Min ${formatCurrency(row.original.minOrderAmount)}` : "No minimum"}</div>
          <div>{row.original.maxDiscountAmount ? `Cap ${formatCurrency(row.original.maxDiscountAmount)}` : "No cap"}</div>
        </div>
      ),
    },
    { accessorKey: "isActive", header: "Status", cell: ({ row }) => <Badge tone={row.original.isActive ? "success" : "neutral"}>{row.original.isActive ? "Active" : "Inactive"}</Badge> },
  ];

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search coupon codes…" pageSize={12} />;
}

function DownloadLogsSection({ rows }: { rows: DownloadLogRow[] }) {
  const columns: ColumnDef<DownloadLogRow>[] = [
    { accessorKey: "productTitle", header: "Product" },
    { accessorKey: "customerName", header: "Customer" },
    { accessorKey: "orderCode", header: "Order" },
    { accessorKey: "fileId", header: "File", cell: ({ row }) => <span className="font-mono text-[12px]">{row.original.fileId}</span> },
    {
      accessorKey: "downloadCount",
      header: "Usage",
      cell: ({ row }) => (
        <span className="tabular">
          {row.original.downloadCount} used · {row.original.remaining} left
        </span>
      ),
    },
    { accessorKey: "createdAt", header: "Last Activity", cell: ({ row }) => formatDateTime(row.original.createdAt) },
  ];

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search download activity…" pageSize={12} />;
}

function BlogSection({ rows }: { rows: BlogRow[] }) {
  const columns: ColumnDef<BlogRow>[] = [
    {
      accessorKey: "title",
      header: "Post",
      cell: ({ row }) => (
        <div className="min-w-[260px]">
          <div className="font-medium">{row.original.title}</div>
          <div className="text-[12px] text-muted">/{row.original.slug}</div>
        </div>
      ),
    },
    { accessorKey: "tags", header: "Tags", cell: ({ row }) => <span className="line-clamp-1">{row.original.tags}</span> },
    { accessorKey: "readingTimeMinutes", header: "Read", cell: ({ row }) => `${row.original.readingTimeMinutes} min` },
    { accessorKey: "publishedAt", header: "Published", cell: ({ row }) => (row.original.publishedAt ? formatDate(row.original.publishedAt) : "Draft") },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  ];

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search blog posts…" pageSize={12} />;
}

function PagesSection({ rows }: { rows: StaticPage[] }) {
  const columns: ColumnDef<StaticPage>[] = [
    {
      accessorKey: "title",
      header: "Page",
      cell: ({ row }) => (
        <div className="min-w-[220px]">
          <div className="font-medium">{row.original.title}</div>
          <div className="text-[12px] text-muted">/{row.original.slug}</div>
        </div>
      ),
    },
    { accessorKey: "metaTitle", header: "Meta Title", cell: ({ row }) => row.original.metaTitle ?? "—" },
    { accessorKey: "updatedAt", header: "Updated", cell: ({ row }) => formatDate(row.original.updatedAt) },
    { accessorKey: "isPublished", header: "Status", cell: ({ row }) => <Badge tone={row.original.isPublished ? "success" : "neutral"}>{row.original.isPublished ? "Published" : "Draft"}</Badge> },
  ];

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search static pages…" pageSize={12} />;
}

function SupportSection({ rows }: { rows: SupportTicket[] }) {
  const columns: ColumnDef<SupportTicket>[] = [
    {
      accessorKey: "subject",
      header: "Ticket",
      cell: ({ row }) => (
        <div className="min-w-[240px]">
          <div className="font-medium">{row.original.subject}</div>
          <div className="text-[12px] text-muted line-clamp-1">{row.original.message}</div>
        </div>
      ),
    },
    { accessorKey: "user", header: "Customer", cell: ({ row }) => row.original.user?.displayName ?? row.original.userId },
    { accessorKey: "priority", header: "Priority", cell: ({ row }) => <Badge tone={ticketPriorityTone(row.original.priority)}>{row.original.priority}</Badge> },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    { accessorKey: "updatedAt", header: "Updated", cell: ({ row }) => formatDateTime(row.original.updatedAt) },
  ];

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search tickets…" pageSize={12} />;
}

function ReportsSection({ data }: { data: ReportsPayload }) {
  const revenueTotal = data.sales.reduce((sum, row) => sum + row.revenue, 0);
  const orderTotal = data.sales.reduce((sum, row) => sum + row.orders, 0);
  const topRevenue = data.products[0]?.revenue ?? 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard label="Revenue in period" value={formatCurrency(revenueTotal)} note="Last 12 seeded months" />
        <MetricCard label="Orders in period" value={formatNumber(orderTotal)} note="Across the marketplace" />
        <MetricCard label="Top product revenue" value={formatCurrency(topRevenue)} note={data.products[0]?.title ?? "No product data"} />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ChartCard title="Sales trend">
            <AreaChartCard data={data.sales} xKey="month" yKey="revenue" valuePrefix="$" />
          </ChartCard>
        </div>
        <ChartCard title="New customer growth">
          <LineChartCard data={data.customers} xKey="month" yKey="newCustomers" />
        </ChartCard>
      </div>
      <ChartCard title="Top product revenue">
        <BarChartCard data={data.products.slice(0, 8)} xKey="title" yKey="revenue" />
      </ChartCard>
    </div>
  );
}

function SettingsSection({ rows }: { rows: Settings[] }) {
  const groups = useMemo(() => {
    return rows.reduce<Record<string, Settings[]>>((acc, row) => {
      acc[row.group] ??= [];
      acc[row.group].push(row);
      return acc;
    }, {});
  }, [rows]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {Object.entries(groups).map(([group, items]) => (
        <section key={group} className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4">
            <h2 className="text-[13px] uppercase tracking-wider font-semibold text-muted">{group}</h2>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-xl border border-border-subtle bg-surface-muted px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-[12px] text-muted">{item.key}</div>
                  </div>
                  <Badge tone={item.isPublic ? "success" : "neutral"}>{item.isPublic ? "Public" : "Private"}</Badge>
                </div>
                <div className="mt-3 rounded-lg border border-border bg-card px-3 py-2 font-mono text-[12px]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function UsersSection({ rows }: { rows: User[] }) {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-[12px] text-muted">{row.original.email}</div>
        </div>
      ),
    },
    { accessorKey: "role", header: "Role", cell: ({ row }) => <Badge tone="violet">{row.original.role.replace("_", " ")}</Badge> },
    { accessorKey: "createdAt", header: "Created", cell: ({ row }) => formatDate(row.original.createdAt) },
  ];

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search admin users…" pageSize={12} />;
}

function RolesSection({ rows }: { rows: RoleRow[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {rows.map((role) => (
        <section key={role.role} className="rounded-2xl border border-border bg-card p-5">
          <Badge tone="dark">{role.role.replace("_", " ")}</Badge>
          <h2 className="mt-4 text-[18px] font-semibold tracking-tight">{role.label}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">{role.description}</p>
        </section>
      ))}
    </div>
  );
}

function AuditLogsSection({ rows }: { rows: AuditLog[] }) {
  const columns: ColumnDef<AuditLog>[] = [
    { accessorKey: "action", header: "Action", cell: ({ row }) => <Badge tone="neutral">{row.original.action}</Badge> },
    { accessorKey: "resource", header: "Resource" },
    { accessorKey: "resourceId", header: "Target", cell: ({ row }) => <span className="font-mono text-[12px]">{row.original.resourceId}</span> },
    { accessorKey: "userId", header: "Actor", cell: ({ row }) => row.original.userId ?? "System" },
    { accessorKey: "createdAt", header: "Created", cell: ({ row }) => formatDateTime(row.original.createdAt) },
  ];

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white">
        <EmptyState title="No audit activity yet" description="Sign-ins, content edits, and admin actions will appear here during the session." />
      </div>
    );
  }

  return <DataTable data={rows} columns={columns} searchPlaceholder="Search audit entries…" pageSize={12} />;
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="text-[12px] uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-2 text-[28px] font-semibold tracking-tight">{value}</div>
      <div className="mt-2 text-[12px] text-muted">{note}</div>
    </section>
  );
}

function SectionSkeleton({ section }: { section: SectionKey }) {
  if (section === "reports") {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <Skeleton className="h-[320px] xl:col-span-2" />
          <Skeleton className="h-[320px]" />
        </div>
      </div>
    );
  }

  if (section === "roles" || section === "settings") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
      </div>
    );
  }

  return <TableSkeleton rows={7} cols={5} />;
}

function ticketPriorityTone(priority: SupportTicket["priority"]): "danger" | "coral" | "yellow" | "neutral" {
  switch (priority) {
    case "urgent":
      return "danger";
    case "high":
      return "coral";
    case "medium":
      return "yellow";
    default:
      return "neutral";
  }
}
