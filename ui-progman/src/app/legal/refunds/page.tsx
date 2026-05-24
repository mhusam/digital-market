import { LegalContent } from "../LegalContent";

export default function RefundPolicy() {
  return (
    <LegalContent title="Refund Policy" lastUpdated="May 20, 2026">
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Digital Nature of Products</h2>
        <p>
          Because our products are digital assets, starter templates, and code modules delivered instantly via download links,
          they cannot be physically returned. As such, all sales are final once download links have been generated.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Exclusions & Support</h2>
        <p>
          If a template is completely broken or is not compatible as described in the documentation and our support team is unable to
          resolve the issue within 7 business days, you may request a refund through our contact interface.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Chargebacks</h2>
        <p>
          Initiating a payment dispute or chargeback without contacting our support team first will result in immediate termination
          of all active licenses and suspension of download permissions for all past purchases.
        </p>
      </section>
    </LegalContent>
  );
}
