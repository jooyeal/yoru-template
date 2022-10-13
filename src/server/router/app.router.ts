import { t } from "../trpc";
import { authRouter } from "./auth.router";
import { campaignRouter } from "./campaign.router";
import { cartRouter } from "./cart.router";
import { categoryRouter } from "./category.router";
import { orderRouter } from "./order.router";
import { productRouter } from "./product.router";
import { userRouter } from "./user.router";
import { addressRouter } from "./address.router";

export const appRouter = t.router({
  user: userRouter,
  auth: authRouter,
  category: categoryRouter,
  product: productRouter,
  cart: cartRouter,
  campaign: campaignRouter,
  order: orderRouter,
  address: addressRouter,
});
