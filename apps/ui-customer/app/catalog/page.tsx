import { Suspense } from "react";
import CatalogClientPage from "./catalog-client";

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-white/70">Loading catalog...</div>}>
      <CatalogClientPage />
    </Suspense>
  );
}
