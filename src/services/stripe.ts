import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { OutputGetCart } from "../schema/cart.schema";

export const redirectToStripe = async ({
  cartData,
  userEmail,
}: {
  cartData: OutputGetCart;
  userEmail: string;
}) => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLICK_KEY ?? "";
  const stripePromise = loadStripe(publishableKey);
  const stripe = await stripePromise;
  const checkoutSession = await axios.post("/api/checkout", {
    cartData,
    userEmail,
  });
  const result = await stripe?.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });
  return result;
};
