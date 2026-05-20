import Link from "next/link";
import { PageChrome } from "../_components/page-chrome";

export default function RegisterPage() {
  return (
    <PageChrome activeHref="/profile" ariaLabelledBy="register-title" className="route-screen auth-screen" footer="Registration is represented as a polished front-end flow for now.">
      <section className="auth-panel" aria-label="Registration form">
        <div className="auth-copy">
          <p className="page-eyebrow"><span>Register</span> Buyer profile</p>
          <h1 id="register-title" className="page-title compact-title">Create a calm place for purchases and licenses.</h1>
          <p className="page-copy">Your account keeps order references, downloads, payment status, and product support in one tidy view.</p>
        </div>
        <div className="auth-card">
          <Link href="/profile" className="google-button" aria-label="Register with Google">
            <span aria-hidden="true">G</span>
            Register with Google
          </Link>
          <label>
            Name
            <input type="text" autoComplete="name" placeholder="Husam" />
          </label>
          <label>
            Email
            <input type="email" autoComplete="email" placeholder="husam@example.com" />
          </label>
          <Link href="/profile" className="button button-primary auth-submit">Create Account</Link>
          <p>Already have access? <Link href="/login">Login</Link></p>
        </div>
      </section>
    </PageChrome>
  );
}
