"use client";

import { useEffect, useState } from "react";
import { customerUpdateProfile } from "@digital-market/api-client";
import { PageChrome } from "../../_components/page-chrome";
import { useCustomer } from "../../_components/customer-provider";
import { useRequireCustomer } from "../../_lib/use-auth-guard";

export default function AccountProfilePage() {
  const { ready, allowed } = useRequireCustomer();
  const { user, setSession, token } = useCustomer();

  const [name, setName] = useState(user?.name ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(user?.name ?? "");
  }, [user?.name]);

  if (!ready || !allowed) {
    return <PageChrome ariaLabelledBy="profile-loading">Loading profile...</PageChrome>;
  }

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    const response = await customerUpdateProfile({
      name,
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined,
    });

    if (!response.success || !response.data) {
      setMessage(response.message ?? "Could not update profile.");
      return;
    }

    if (token) {
      setSession({ token, user: response.data });
    }
    setCurrentPassword("");
    setNewPassword("");
    setMessage("Profile updated.");
  };

  return (
    <PageChrome
      activeHref="/account/profile"
      ariaLabelledBy="profile-title"
      className="route-screen auth-screen"
      footer="Customer profile supports name updates and optional password rotation."
    >
      <section className="auth-panel" aria-label="Profile update form">
        <div className="auth-copy">
          <p className="page-eyebrow"><span>Account</span> Profile</p>
          <h1 id="profile-title" className="page-title compact-title">Update your customer details.</h1>
          <p className="page-copy">Keep name and password current for secure access to orders and downloads.</p>
        </div>

        <form className="auth-card" onSubmit={saveProfile}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Current password
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Leave blank to keep existing" />
          </label>
          <label>
            New password
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimum 8 characters" />
          </label>
          {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
          <button type="submit" className="button button-primary auth-submit">Save profile</button>
        </form>
      </section>
    </PageChrome>
  );
}
