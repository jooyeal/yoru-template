import z from "zod";

export const inputRegistOrderSchema = z.object({
  userEmail: z.string(),
  totalPrice: z.number(),
  cartData: z.number().array(),
});

export const outputGetOrdersSchema = z
  .object({
    id: z.string(),
    userEmail: z.string(),
    totalPrice: z.number(),
    createdAt: z.date(),
    status: z.string(),
  })
  .array();

export const outputGetOrdersTodaySchema = z.object({
  dailyTotal: z.number(),
  monthlyTotal: z.number(),
  dailyGrowthRate: z.number(),
  monthlyGrowthRate: z.number(),
});

export const outputGetMonthlyOrders = z.object({
  jan: z.object({ totalPrice: z.number() }).array(),
  feb: z.object({ totalPrice: z.number() }).array(),
  mar: z.object({ totalPrice: z.number() }).array(),
  apr: z.object({ totalPrice: z.number() }).array(),
  may: z.object({ totalPrice: z.number() }).array(),
  jun: z.object({ totalPrice: z.number() }).array(),
  jul: z.object({ totalPrice: z.number() }).array(),
  aug: z.object({ totalPrice: z.number() }).array(),
  sep: z.object({ totalPrice: z.number() }).array(),
  oct: z.object({ totalPrice: z.number() }).array(),
  nov: z.object({ totalPrice: z.number() }).array(),
  dec: z.object({ totalPrice: z.number() }).array(),
});

export type InputRegistOrderSchema = z.TypeOf<typeof inputRegistOrderSchema>;
export type OutputGetOrdersSchema = z.TypeOf<typeof outputGetOrdersSchema>;
export type OutputGetOrdersTodaySchema = z.TypeOf<
  typeof outputGetOrdersTodaySchema
>;
export type OutputGetMonthlyOrders = z.TypeOf<typeof outputGetMonthlyOrders>;
