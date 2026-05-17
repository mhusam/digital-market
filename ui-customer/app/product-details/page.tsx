import { getProducts } from "@digital-market/api-client";
import { redirect } from "next/navigation";

export default async function ProductDetailsEntryPage() {
  const res = await getProducts({ sortBy: "popular", limit: 1 });
  const first = res.data?.[0];

  if (first?.slug) {
    redirect(`/products/${first.slug}`);
  }

  redirect("/products");
}
