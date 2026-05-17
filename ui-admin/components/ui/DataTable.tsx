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
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "./Input";

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

  return (
    <div className="bg-white border border-[#e8e5df] rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between px-4 py-3 border-b border-[#eee9de] bg-[#faf9f5]">
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

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-[#eee9de] bg-[#faf9f5]">
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const dir = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="text-left px-4 py-2.5 text-[11px] uppercase tracking-wide font-semibold text-[#6b6760]"
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1 hover:text-[#1B1B1B]"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {dir === "asc" ? <ChevronUp className="size-3" /> : dir === "desc" ? <ChevronDown className="size-3" /> : <ChevronsUpDown className="size-3 opacity-50" />}
                        </button>
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
              <tr>
                <td colSpan={columns.length} className="px-4 py-12">
                  {emptyState ?? (
                    <div className="text-center text-[13px] text-[#6b6760]">No results.</div>
                  )}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  className={
                    "border-b border-[#f3efe6] last:border-b-0 hover:bg-[#fbfaf6] transition-colors" +
                    (onRowClick ? " cursor-pointer" : "")
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#eee9de] bg-[#faf9f5]">
          <span className="text-[12px] text-[#6b6760]">
            Page <span className="tabular font-medium text-[#1B1B1B]">{table.getState().pagination.pageIndex + 1}</span> of {table.getPageCount()} · {data.length} total
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="size-8 inline-flex items-center justify-center border border-[#e8e5df] rounded-md hover:bg-white disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="size-8 inline-flex items-center justify-center border border-[#e8e5df] rounded-md hover:bg-white disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
