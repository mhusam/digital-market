"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 rounded-full bg-white text-[#1B1B1B] inline-flex items-center justify-center disabled:opacity-40 hover:bg-[#1B1B1B] hover:text-[#1E5FAF] transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} strokeWidth={2.6} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`min-w-10 h-10 px-3 rounded-full font-black text-sm transition-colors ${
            p === page
              ? "bg-[#1B1B1B] text-[#1E5FAF]"
              : "bg-white text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#1E5FAF]"
          }`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 rounded-full bg-white text-[#1B1B1B] inline-flex items-center justify-center disabled:opacity-40 hover:bg-[#1B1B1B] hover:text-[#1E5FAF] transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} strokeWidth={2.6} />
      </button>
    </nav>
  );
}
