import { Suspense } from "react";
import LoginClientPage from "./login-client";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-white/70">Loading login...</div>}>
      <LoginClientPage />
    </Suspense>
  );
}
