"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages: number[] = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, start + 4)
  for (let index = start; index <= end; index += 1) pages.push(index)

  return (
    <ShadcnPagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={page === 1}
            onClick={() => onChange(Math.max(1, page - 1))}
            aria-label="Previous page"
          >
            <ChevronLeftIcon />
          </Button>
        </PaginationItem>
        {pages.map((candidate) => (
          <PaginationItem key={candidate}>
            <Button
              type="button"
              variant={candidate === page ? "outline" : "ghost"}
              size="icon"
              onClick={() => onChange(candidate)}
              aria-current={candidate === page ? "page" : undefined}
            >
              {candidate}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={page === totalPages}
            onClick={() => onChange(Math.min(totalPages, page + 1))}
            aria-label="Next page"
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
}
