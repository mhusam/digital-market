import { redirect } from "next/navigation";

export default function PaymentSuccessPage() {
  redirect("/checkout/success");
}
