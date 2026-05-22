"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCustomer } from "../_components/customer-provider";

export function useRequireCustomer() {
  const { ready, user } = useCustomer();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/account")}`);
    }
  }, [ready, user, router, pathname]);

  return { ready, user, allowed: ready && Boolean(user) };
}
