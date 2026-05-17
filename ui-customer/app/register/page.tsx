import { RegisterClient } from "./RegisterClient";

interface RegisterPageProps {
  searchParams: Promise<{
    next?: string | string[];
  }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath = rawNext?.startsWith("/") ? rawNext : "/account";

  return <RegisterClient nextPath={nextPath} />;
}
