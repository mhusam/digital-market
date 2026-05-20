"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, FolderTree } from "lucide-react";
import {
  adminGetCategories,
  adminCreateCategory,
  adminDeleteCategory,
  adminUpdateCategory,
} from "@digital-market/api-client";
import type { Category } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { toast } from "@/components/ui/Toast";
import { slugify } from "@/lib/format";

const accents = ["#4F46E5", "#2BC4A8", "#8B7CF6", "#FF7A59", "#6FA8FF"];

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    void adminGetCategories().then((res) => {
      if (active && res.data) setItems(res.data);
    });
    return () => {
      active = false;
    };
  }, []);

  const refresh = async () => {
    const res = await adminGetCategories();
    if (res.data) setItems(res.data);
  };

  const openCreate = () => {
    setEditing(null);
    setName("");
    setSlug("");
    setDescription("");
    setModalOpen(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setName(c.name);
    setSlug(c.slug);
    setDescription(c.description ?? "");
    setModalOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    const data = { name, slug: slug || slugify(name), description, sortOrder: items?.length ?? 0 };
    const res = editing
      ? await adminUpdateCategory(editing.id, data)
      : await adminCreateCategory(data);
    setSubmitting(false);
    if (res.success) {
      toast.success(editing ? "Category updated" : "Category created");
      setModalOpen(false);
      void refresh();
    } else {
      toast.error(res.message ?? "Operation failed");
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    const res = await adminDeleteCategory(toDelete.id);
    if (res.success) {
      toast.success("Category deleted");
      void refresh();
    } else {
      toast.error(res.message ?? "Could not delete.");
    }
    setToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Organize the catalog. Categories cannot be deleted if they contain products."
        actions={
          <Button leftIcon={<Plus className="size-4" />} onClick={openCreate}>
            Add Category
          </Button>
        }
      />

      {items === null ? (
        <Skeleton className="h-72" />
      ) : items.length === 0 ? (
        <div className="bg-card border border-border rounded-xl shadow-sm">
          <EmptyState
            icon={<FolderTree className="size-6" />}
            title="No categories yet"
            description="Group products by category to improve discovery."
            action={<Button leftIcon={<Plus className="size-4" />} onClick={openCreate}>Add Category</Button>}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c, i) => (
            <div key={c.id} className="bg-card border border-border rounded-xl shadow-sm p-5 hover:border-border-strong transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span
                  className="size-10 rounded-lg flex items-center justify-center text-ink font-bold text-[15px]"
                  style={{ background: accents[i % accents.length] + "33", color: "var(--color-ink)" }}
                >
                  {c.name.charAt(0)}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(c)} className="size-8 inline-flex items-center justify-center rounded-md hover:bg-black/5" aria-label="Edit">
                    <Pencil className="size-4" />
                  </button>
                  <button onClick={() => setToDelete(c)} className="size-8 inline-flex items-center justify-center rounded-md hover:bg-[#fee2e2] text-[#ef4444]" aria-label="Delete">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-[15px] font-semibold tracking-tight">{c.name}</h3>
              <p className="text-[12.5px] text-muted mt-0.5 font-mono">/{c.slug}</p>
              {c.description && <p className="text-[13px] text-ink/80 mt-2 line-clamp-2">{c.description}</p>}
              <div className="mt-3 flex items-center gap-2">
                <Badge tone="neutral">{c.productCount} products</Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit category" : "New category"}
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button form="cat-form" type="submit" loading={submitting}>{editing ? "Save" : "Create"}</Button>
          </>
        }
      >
        <form id="cat-form" onSubmit={submit} className="space-y-4">
          <Input label="Name" value={name} onChange={(e) => { setName(e.target.value); if (!editing) setSlug(slugify(e.target.value)); }} required />
          <Input label="Slug" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} hint="URL-safe" required />
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete category?"
        message={`Delete "${toDelete?.name}"? Categories with products cannot be deleted.`}
        destructive
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
