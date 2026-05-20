"use client";

import { create } from "zustand";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastKind = "success" | "error" | "info";

interface ToastItem {
  id: string;
  kind: ToastKind;
  message: string;
}

interface ToastStore {
  items: ToastItem[];
  push: (kind: ToastKind, message: string) => void;
  dismiss: (id: string) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  items: [],
  push: (kind, message) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    set((s) => ({ items: [...s.items, { id, kind, message }] }));
    setTimeout(() => set((s) => ({ items: s.items.filter((i) => i.id !== id) })), 3800);
  },
  dismiss: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
}));

export const toast = {
  success: (m: string) => useToastStore.getState().push("success", m),
  error: (m: string) => useToastStore.getState().push("error", m),
  info: (m: string) => useToastStore.getState().push("info", m),
};

const iconFor = {
  success: <CheckCircle2 className="size-4 text-[#22c55e]" />,
  error: <AlertCircle className="size-4 text-[#ef4444]" />,
  info: <Info className="size-4 text-[#6FA8FF]" />,
};

export function Toaster() {
  const { items, dismiss } = useToastStore();
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 w-[340px] pointer-events-none">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-ink text-white border border-black/40 rounded-lg shadow-xl px-4 py-3 flex items-start gap-2"
          >
            <span className="mt-0.5">{iconFor[t.kind]}</span>
            <p className="flex-1 text-[13px] leading-relaxed">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="opacity-60 hover:opacity-100" aria-label="Dismiss">
              <X className="size-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
