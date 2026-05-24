import { LegalContent } from "../LegalContent";

export default function PrivacyPolicy() {
  return (
    <LegalContent title="Privacy Policy" lastUpdated="May 20, 2026">
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Information We Collect</h2>
        <p>
          We collect billing details, email addresses, and names when you register or initiate a purchase. Payment transaction
          tokens are handled securely by external gateways (PayPal, bank transfer records) and are never stored directly on our servers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Cookie Usage</h2>
        <p>
          We use functional HTTP-Only session cookies to preserve your shopping cart state, maintain authorization sessions, and
          remember interface light/dark preferences. No tracking pixels or third-party advertising cookies are initialized.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Security Auditing</h2>
        <p>
          Your account download logs are audited regularly to prevent credential sharing and abuse of license keys. These logs
          contain IP addresses, timestamp markers, and license codes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">4. User Rights</h2>
        <p>
          You have the right to request deletion of your account and customer data at any time. For support inquiries regarding GDPR
          or data exports, please use our contact form or reach out directly to support@local.sellonline.
        </p>
      </section>
    </LegalContent>
  );
}
