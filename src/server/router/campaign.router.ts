import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { editCategorySchema } from "../../schema/category.schema";
import { prisma } from "../../utils/prisma";
import { Prisma } from "@prisma/client";
import {
  inputDeleteCampaignSchema,
  inputRegistCampaignSchema,
  outputGetCampaignsSchema,
} from "../../schema/campaign.schema";

export const campaignRouter = t.router({
  regist: t.procedure
    .input(inputRegistCampaignSchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.campagign.create({
          data: {
            ...input,
          },
        });
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
  get: t.procedure.output(outputGetCampaignsSchema).query(async () => {
    try {
      const campaigns = await prisma.campagign.findMany();
      return campaigns;
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
  delete: t.procedure
    .input(inputDeleteCampaignSchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.campagign.delete({
          where: {
            id: input.id,
          },
        });
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
  edit: t.procedure.input(editCategorySchema).mutation(async ({ input }) => {}),
});
