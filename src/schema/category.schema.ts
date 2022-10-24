import z, { number } from "zod";

export const registCategorySchema = z.object({
  name: z.string(),
});

export const deleteCategorySchema = z.object({
  name: z.string(),
});

export const editCategorySchema = z.object({
  targetName: z.string(),
  newName: z.string(),
});

export const outPutCategorySchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .array();
