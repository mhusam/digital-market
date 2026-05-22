import Link from "next/link"
import type { ReactNode } from "react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  ctaHref?: string
  ctaLabel?: string
  illustration?: "search" | "cart" | "orders" | "downloads" | "default"
}

const labelMap = {
  search: "Search",
  cart: "Cart",
  orders: "Orders",
  downloads: "Files",
  default: "Empty",
}

export function EmptyState({
  icon,
  title,
  description,
  ctaHref,
  ctaLabel,
  illustration = "default",
}: EmptyStateProps) {
  return (
    <Empty className="border border-dashed bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {icon ?? <span className="text-xs font-semibold">{labelMap[illustration]}</span>}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {ctaHref && ctaLabel && (
        <EmptyContent>
          <Button render={<Link href={ctaHref} />}>{ctaLabel}</Button>
        </EmptyContent>
      )}
    </Empty>
  )
}
