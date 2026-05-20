import Link from "next/link";
import { PageChrome } from "../_components/page-chrome";

export default function LoginPage() {
  return (
    <PageChrome activeHref="/profile" ariaLabelledBy="login-title" className="route-screen auth-screen" footer="OAuth wiring can attach to the Google button when client credentials are available.">
      <section className="auth-panel" aria-label="Login form">
        <div className="auth-copy">
          <p className="page-eyebrow"><span>Login</span> Customer access</p>
          <h1 id="login-title" className="page-title compact-title">Welcome back to your marketplace console.</h1>
          <p className="page-copy">Continue with Google or use your email to view downloads, orders, and payment references.</p>
        </div>
        <div className="auth-card">
          <Link href="/profile" className="google-button" aria-label="Continue with Google">
            <span aria-hidden="true">G</span>
            Continue with Google
          </Link>
          <label>
            Email
            <input type="email" autoComplete="email" placeholder="husam@example.com" />
          </label>
          <label>
            Password
            <input type="password" autoComplete="current-password" placeholder="********" />
          </label>
          <Link href="/profile" className="button button-primary auth-submit">Login</Link>
          <p>New here? <Link href="/register">Create an account</Link></p>
        </div>
      </section>
    </PageChrome>
  );
}
