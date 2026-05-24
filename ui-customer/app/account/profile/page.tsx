"use client";

import { useEffect, useState } from "react";
import { getMe, updateMe } from "@digital-market/api-client";
import type { User } from "@digital-market/shared-types";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";
import { useAuthStore } from "../../../store/authStore";
import { toast } from "../../../store/toastStore";

const INPUT_CLASS =
  "mt-1.5 h-12 w-full rounded-2xl border-2 border-transparent bg-muted/40 px-4 text-sm font-bold text-foreground focus:border-foreground";

export default function AccountProfilePage() {
  const syncUser = useAuthStore((state) => state.updateUser);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const response = await getMe();
      if (!cancelled && response.data) {
        const me = response.data;
        setUser(me);
        setFirstName(me.firstName ?? "");
        setLastName(me.lastName ?? "");
        setDisplayName(me.displayName ?? "");
        setPhoneNumber(me.phoneNumber ?? "");
        setLine1(me.billingAddress?.line1 ?? "");
        setLine2(me.billingAddress?.line2 ?? "");
        setCity(me.billingAddress?.city ?? "");
        setState(me.billingAddress?.state ?? "");
        setPostalCode(me.billingAddress?.postalCode ?? "");
        setCountry(me.billingAddress?.country ?? "");
      }
      if (!cancelled) setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const response = await updateMe({
      firstName,
      lastName,
      displayName,
      phoneNumber: phoneNumber || undefined,
      billingAddress: {
        line1,
        line2: line2 || undefined,
        city,
        state: state || undefined,
        postalCode,
        country,
      },
    });
    setSaving(false);

    if (!response.success || !response.data) {
      toast.error("Profile update failed", response.message);
      return;
    }

    setUser(response.data);
    syncUser(response.data);
    toast.success("Profile saved", "Your mock customer profile was updated.");
  };

  if (loading) {
    return <Skeleton className="h-[680px] rounded-[32px]" />;
  }

  return (
    <Card className="p-6 md:p-7">
      <div className="max-w-2xl">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
          Profile
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
          Keep your checkout identity and billing details current.
        </h2>
        <p className="mt-3 text-sm font-semibold text-muted-foreground">
          This page updates the persisted customer profile used by the mock auth
          flow and account screens.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
              First name
            </span>
            <input value={firstName} onChange={(event) => setFirstName(event.target.value)} className={INPUT_CLASS} required />
          </label>
          <label className="block">
            <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
              Last name
            </span>
            <input value={lastName} onChange={(event) => setLastName(event.target.value)} className={INPUT_CLASS} required />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
              Display name
            </span>
            <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} className={INPUT_CLASS} required />
          </label>
          <label className="block">
            <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
              Phone number
            </span>
            <input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} className={INPUT_CLASS} placeholder="+1 555 000 0000" />
          </label>
        </div>

        <label className="block">
          <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
            Email
          </span>
          <input value={user?.email ?? ""} className={`${INPUT_CLASS} opacity-70`} readOnly />
        </label>

        <div className="rounded-[28px] bg-muted/40 px-5 py-5">
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
            Billing address
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Address line 1
              </span>
              <input value={line1} onChange={(event) => setLine1(event.target.value)} className={INPUT_CLASS} required />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Address line 2
              </span>
              <input value={line2} onChange={(event) => setLine2(event.target.value)} className={INPUT_CLASS} />
            </label>
            <label className="block">
              <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                City
              </span>
              <input value={city} onChange={(event) => setCity(event.target.value)} className={INPUT_CLASS} required />
            </label>
            <label className="block">
              <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                State / region
              </span>
              <input value={state} onChange={(event) => setState(event.target.value)} className={INPUT_CLASS} />
            </label>
            <label className="block">
              <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Postal code
              </span>
              <input value={postalCode} onChange={(event) => setPostalCode(event.target.value)} className={INPUT_CLASS} required />
            </label>
            <label className="block">
              <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Country
              </span>
              <input value={country} onChange={(event) => setCountry(event.target.value)} className={INPUT_CLASS} required />
            </label>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Saving..." : "Save profile"}
        </Button>
      </form>
    </Card>
  );
}
