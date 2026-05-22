import { Suspense } from "react";
import BankInstructionsClientPage from "./bank-instructions-client";

export default function BankInstructionsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-white/70">Loading instructions...</div>}>
      <BankInstructionsClientPage />
    </Suspense>
  );
}
