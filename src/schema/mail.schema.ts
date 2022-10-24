import z from "zod";

export const inputMailAuthentication = z.object({
  email: z.string(),
});

export const outputMailAuthentication = z.object({
  authCode: z.string(),
});

export const inputReviewRequest = z.object({
  email: z.string(),
  products: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .array(),
  orderId: z.string(),
});
