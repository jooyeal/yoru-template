import z, { number } from "zod";

export const inputRegistCampaignSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
});

export const outputGetCampaignsSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
  })
  .array();

export const inputDeleteCampaignSchema = z.object({
  id: z.number(),
});

export type OutputGetCampaigns = z.TypeOf<typeof outputGetCampaignsSchema>;
