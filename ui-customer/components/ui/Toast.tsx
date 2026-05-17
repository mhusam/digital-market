"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToastStore } from "../../store/toastStore";

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const bgs = {
  success: "bg-[#14B8A6]",
  error: "bg-[#DC2626]",
  info: "bg-[#1E40AF]",
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.removeToast);

  return (
    <div className="fixed z-[300] bottom-6 right-6 left-6 md:left-auto flex flex-col gap-3 pointer-events-none max-w-sm md:ml-auto">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = icons[t.variant];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`pointer-events-auto ${bgs[t.variant]} text-white rounded-2xl shadow-xl px-4 py-3 flex items-start gap-3`}
            >
              <Icon size={20} className="mt-0.5 flex-shrink-0" strokeWidth={2.4} />
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm">{t.title}</p>
                {t.description && (
                  <p className="text-white/90 text-[13px] mt-0.5 font-semibold">
                    {t.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => remove(t.id)}
                className="text-white/80 hover:text-white"
                aria-label="Dismiss"
              >
                <X size={14} strokeWidth={2.6} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
