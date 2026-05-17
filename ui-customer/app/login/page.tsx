import { LoginClient } from "./LoginClient";

interface LoginPageProps {
  searchParams: Promise<{
    next?: string | string[];
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath = rawNext?.startsWith("/") ? rawNext : "/account";

  return <LoginClient nextPath={nextPath} />;
}
