import { LegalContent } from "../LegalContent";

export default function TermsOfService() {
  return (
    <LegalContent title="Terms of Service" lastUpdated="May 20, 2026">
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Agreement to Terms</h2>
        <p>
          By accessing or using the PROGMAN digital marketplace, you agree to be bound by these Terms of Service.
          If you do not agree, please do not use our services. All digital templates, boilerplates, and components
          are subject to the licensing agreements specified at checkout.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Product Licensing</h2>
        <p>
          Each digital product purchased from PROGMAN is governed by either a Single-Use or Multi-Use license. You may not
          redistribute, resell, or sublease our templates or products without explicit written permission from PROGMAN.
          Modification of codebase items is permitted for inclusion in your own final applications.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Account Integrity</h2>
        <p>
          When you register an account, you are responsible for maintaining the confidentiality of your credentials.
          We reserve the right to suspend or terminate accounts that violate intellectual property rules or distribute
          malicious code in our forums or developer showcase channels.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">4. Limitation of Liability</h2>
        <p>
          PROGMAN products are provided &quot;as is&quot; without warranties of any kind. We are not liable for any direct or
          indirect damages resulting from dependencies, bugs, or compiler configuration differences when integrating templates
          with your infrastructure.
        </p>
      </section>
    </LegalContent>
  );
}
