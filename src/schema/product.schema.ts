import z from "zod";

export const registProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  discount: z.boolean(),
  discountRate: z.nullable(z.number()),
  price: z.number(),
  quantity: z.number(),
  categoryId: z.number(),
  thumbnail: z.string(),
  images: z.string().array(),
  size: z.string().array(),
  color: z.string().array(),
  recommend: z.boolean(),
});

export const editProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  discount: z.boolean(),
  discountRate: z.nullable(z.number()),
  price: z.number(),
  quantity: z.number(),
  categoryId: z.number(),
  thumbnail: z.string(),
  images: z.string().array(),
  size: z.string().array(),
  color: z.string().array(),
  recommend: z.boolean(),
});

export const tableSingleProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  discount: z.boolean(),
  price: z.number(),
  quantity: z.number(),
  category: z.object({ id: z.number(), name: z.string() }),
  thumbnail: z.string(),
  discountRate: z.nullable(z.number()),
});

export const inputGetProductsByCategoryId = z.object({
  id: z.number(),
});

export const inputGetRecommendByCategory = z.object({
  categoryId: z.number(),
  currentProductId: z.string(),
});

export const getSingleProductSchema = z.object({
  id: z.string(),
});

export const deleteProductSchema = z.object({
  id: z.string(),
});

export const outputTableProductsSchema = tableSingleProductSchema
  .array()
  .optional();

export const outputSingleProductSchema = z.nullable(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    discount: z.boolean(),
    discountRate: z.nullable(z.number()),
    price: z.number(),
    quantity: z.number(),
    categoryId: z.number(),
    thumbnail: z.string(),
    images: z.string().array(),
    size: z.string().array(),
    color: z.string().array(),
    recommend: z.boolean(),
  })
);

export const inputSearchByTitle = z.object({
  title: z.string(),
  filter: z.enum(["PRICE_HIGH", "PRICE_LOW", "NORMAL"]).optional(),
});

export const outputSearchByTitle = z.nullable(
  z
    .object({
      id: z.string(),
      title: z.string(),
      discount: z.boolean(),
      discountRate: z.nullable(z.number()),
      price: z.number(),
      thumbnail: z.string(),
    })
    .array()
);

export const outputGetProductsByCategoryId = tableSingleProductSchema.array();

export type TableSingleProduct = z.TypeOf<typeof tableSingleProductSchema>;
export type TableProduct = z.TypeOf<typeof outputTableProductsSchema>;
export type RegistProductInput = z.TypeOf<typeof registProductSchema>;
export type EditProductInput = z.TypeOf<typeof editProductSchema>;
export type OutputGetProductsByCategoryId = z.TypeOf<
  typeof outputGetProductsByCategoryId
>;
