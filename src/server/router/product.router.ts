import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  deleteProductSchema,
  editProductSchema,
  getSingleProductSchema,
  inputGetProductsByCategoryId,
  inputGetRecommendByCategory,
  inputSearchByTitle,
  outputGetProductsByCategoryId,
  outputSearchByTitle,
  outputSingleProductSchema,
  outputTableProductsSchema,
  registProductSchema,
} from "../../schema/product.schema";
import { Prisma } from "@prisma/client";
import { prisma } from "../../utils/prisma";

export const productRouter = t.router({
  regist: t.procedure.input(registProductSchema).mutation(async ({ input }) => {
    try {
      await prisma.product.create({
        data: {
          ...input,
        },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SYSTEM ERROR",
        });
      }
      throw e;
    }
  }),
  get: t.procedure.output(outputTableProductsSchema).query(async () => {
    try {
      const products = await prisma.product.findMany({
        include: { category: true },
      });
      return products;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SYSTEM ERROR",
        });
      }
      throw e;
    }
  }),
  getRecommend: t.procedure
    .output(outputTableProductsSchema)
    .query(async () => {
      try {
        const products = await prisma.product.findMany({
          where: {
            recommend: true,
          },
          include: { category: true },
        });
        return products;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "SYSTEM ERROR",
          });
        }
        throw e;
      }
    }),
  getRecommendByCategoryId: t.procedure
    .input(inputGetRecommendByCategory)
    .output(outputTableProductsSchema)
    .query(async ({ input }) => {
      try {
        const products = await prisma.product.findMany({
          where: {
            recommend: true,
            categoryId: input.categoryId,
            NOT: {
              id: input.currentProductId,
            },
          },
          take: 5,
          include: { category: true },
        });
        return products;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "SYSTEM ERROR",
          });
        }
        throw e;
      }
    }),
  getSales: t.procedure.output(outputTableProductsSchema).query(async () => {
    try {
      const products = await prisma.product.findMany({
        where: {
          discount: true,
        },
        include: { category: true },
      });
      return products;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SYSTEM ERROR",
        });
      }
      throw e;
    }
  }),
  getSingle: t.procedure
    .input(getSingleProductSchema)
    .output(outputSingleProductSchema)
    .query(async ({ input }) => {
      try {
        const product = await prisma.product.findUnique({
          where: { id: input.id },
        });
        return product;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "SYSTEM ERROR",
          });
        }
        throw e;
      }
    }),
  getProductsByCategoryId: t.procedure
    .input(inputGetProductsByCategoryId)
    .output(outputGetProductsByCategoryId)
    .query(async ({ input }) => {
      try {
        const take = 10;
        const skip = (input.page - 1) * 10;
        if (!input.filter || input.filter === "NORMAL") {
          const products = await prisma.product.findMany({
            where: { categoryId: input.id },
            skip,
            take,
            include: {
              category: true,
            },
          });
          return products;
        } else {
          const products = await prisma.product.findMany({
            where: {
              categoryId: input.id,
            },
            skip,
            take,
            include: {
              category: true,
            },
            orderBy: [
              { price: input.filter === "PRICE_HIGH" ? "desc" : "asc" },
            ],
          });
          return products;
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "SYSTEM ERROR",
          });
        }
        throw e;
      }
    }),
  delete: t.procedure.input(deleteProductSchema).mutation(async ({ input }) => {
    try {
      await prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case "P2025":
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Record to delete does not exist.",
            });
          default:
            throw new trpc.TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "SYSTEM ERROR",
            });
        }
      }
      throw e;
    }
  }),
  edit: t.procedure
    .input(editProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await prisma.product.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          switch (e.code) {
            case "P2025":
              throw new trpc.TRPCError({
                code: "CONFLICT",
                message: "Record to delete does not exist.",
              });
            default:
              throw new trpc.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "SYSTEM ERROR",
              });
          }
        }
        throw e;
      }
    }),
  searchByTitle: t.procedure
    .input(inputSearchByTitle)
    .output(outputSearchByTitle)
    .query(async ({ input }) => {
      try {
        const take = 10;
        const skip = (input.page - 1) * 10;
        if (!input.filter || input.filter === "NORMAL") {
          const items = await prisma.product.findMany({
            where: {
              title: {
                contains: input.title,
              },
            },
            skip,
            take,
          });
          return items;
        } else {
          const items = await prisma.product.findMany({
            where: {
              title: {
                contains: input.title,
              },
            },
            skip,
            take,
            orderBy: [
              { price: input.filter === "PRICE_HIGH" ? "desc" : "asc" },
            ],
          });
          return items;
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "SYSTEM ERROR",
          });
        }
        throw e;
      }
    }),
});
