"use client";

import { useState, type ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "./Input";
import { Table, ThSortButton } from "./Table";
import { cn } from "@/lib/cn";

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  rightActions?: ReactNode;
  emptyState?: ReactNode;
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  searchPlaceholder = "Search…",
  searchKey,
  rightActions,
  emptyState,
  pageSize = 10,
  onRowClick,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const stringifyValue = (value: unknown): string => {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }
    if (Array.isArray(value)) {
      return value.map(stringifyValue).join(" ");
    }
    if (typeof value === "object") {
      return Object.values(value as Record<string, unknown>).map(stringifyValue).join(" ");
    }
    return "";
  };

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
    globalFilterFn: (row, _, filterValue) => {
      if (!filterValue) return true;
      const search = String(filterValue).toLowerCase();
      if (searchKey) {
        const v = row.original[searchKey];
        return stringifyValue(v).toLowerCase().includes(search);
      }
      return Object.values(row.original as Record<string, unknown>)
        .map(stringifyValue)
        .join(" ")
        .toLowerCase()
        .includes(search);
    },
  });

  const rows = table.getRowModel().rows;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="panel">
      <div className="surface-header flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="sm:w-72">
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            leftIcon={<Search className="size-4" />}
          />
        </div>
        {rightActions && <div className="flex items-center gap-2">{rightActions}</div>}
      </div>

      <Table interactive={Boolean(onRowClick)}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const dir = header.column.getIsSorted();
                const meta = header.column.columnDef.meta as { numeric?: boolean } | undefined;
                return (
                  <th key={header.id} className={cn(meta?.numeric && "cell-numeric")}>
                    {header.isPlaceholder ? null : canSort ? (
                      <ThSortButton
                        sorted={dir === false ? false : dir}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </ThSortButton>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="admin-table-empty">
              <td colSpan={columns.length}>
                {emptyState ?? <div className="text-[13px]">No results found.</div>}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} onClick={onRowClick ? () => onRowClick(row.original) : undefined}>
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as { numeric?: boolean; muted?: boolean } | undefined;
                  return (
                    <td
                      key={cell.id}
                      className={cn(meta?.numeric && "cell-numeric", meta?.muted && "cell-muted")}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {pageCount > 1 && (
        <div className="surface-header flex items-center justify-between gap-4">
          <span className="text-[12px] text-muted">
            Showing{" "}
            <span className="tabular font-medium text-ink">
              {rows.length === 0 ? 0 : pageIndex * pageSize + 1}–{Math.min((pageIndex + 1) * pageSize, data.length)}
            </span>{" "}
            of <span className="tabular font-medium text-ink">{data.length}</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-muted tabular">
              Page {pageIndex + 1} / {pageCount}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="size-8 inline-flex items-center justify-center border border-border rounded-md bg-card hover:bg-surface-hover hover:border-border-strong disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="size-8 inline-flex items-center justify-center border border-border rounded-md bg-card hover:bg-surface-hover hover:border-border-strong disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
