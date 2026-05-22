import { Suspense } from "react";
import CheckoutSuccessClientPage from "./success-client";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-white/70">Finalizing payment...</div>}>
      <CheckoutSuccessClientPage />
    </Suspense>
  );
}
