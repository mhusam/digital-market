"use client";

import { use } from "react";
import Link from "next/link";
import { GitBranch, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ProductVersionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div>
      <PageHeader
        title="Product Versions"
        description="Version history and changelog management."
        actions={
          <Link href={`/admin/products/${id}/edit`}>
            <Button variant="secondary" leftIcon={<ArrowLeft className="size-4" />}>Back to product</Button>
          </Link>
        }
      />
      <div className="bg-card border border-border rounded-xl shadow-sm">
        <EmptyState
          icon={<GitBranch className="size-6" />}
          title="Version management coming soon"
          description="Product versioning is not yet available in this release."
        />
      </div>
    </div>
  );
}
