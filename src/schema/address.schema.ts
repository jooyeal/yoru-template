import z, { number } from "zod";

export const registAddressSchema = z.object({
  userEmail: z.string(),
  nameKanji: z.string(),
  nameKana: z.string(),
  phone: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string(),
  isDefault: z.boolean(),
});

export type RegistAddress = z.TypeOf<typeof registAddressSchema>;