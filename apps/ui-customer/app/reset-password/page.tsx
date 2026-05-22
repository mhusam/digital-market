import { Suspense } from "react";
import ResetPasswordClientPage from "./reset-password-client";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-white/70">Loading reset form...</div>}>
      <ResetPasswordClientPage />
    </Suspense>
  );
}
