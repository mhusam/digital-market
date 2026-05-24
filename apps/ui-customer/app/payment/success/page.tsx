import { redirect } from "next/navigation";

export default function LegacyPaymentSuccessRedirect() {
  redirect("/checkout/success");
}
