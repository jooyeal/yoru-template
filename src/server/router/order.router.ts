import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { prisma } from "../../utils/prisma";
import { Prisma } from "@prisma/client";
import {
  inputRegistOrderSchema,
  outputGetMonthlyOrders,
  outputGetOrdersSchema,
  outputGetOrdersTodaySchema,
} from "../../schema/order.schema";

export const orderRouter = t.router({
  regist: t.procedure
    .input(inputRegistOrderSchema)
    .mutation(async ({ input }) => {
      try {
        const newOrder = await prisma.order.create({
          data: {
            userEmail: input.userEmail,
            totalPrice: input.totalPrice,
            status: "PAYMENT_PROCEED",
          },
        });
        Promise.all(
          input.cartData.map(async (id) => {
            await prisma.cartData.update({
              where: {
                id,
              },
              data: {
                cartId: null,
                orderId: newOrder.id,
              },
            });
          })
        );
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
  get: t.procedure.output(outputGetOrdersSchema).query(async () => {
    try {
      const orders = await prisma.order.findMany({
        orderBy: [{ createdAt: "desc" }],
      });
      return orders;
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
  getOrdersToday: t.procedure
    .output(outputGetOrdersTodaySchema)
    .query(async () => {
      try {
        const date = new Date();
        const today = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;

        date.setDate(new Date(today).getDate() + 1);
        const tomorrow = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;

        date.setDate(new Date(today).getDate() - 1);
        const yesterday = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;

        const todayOrders = await prisma.order.findMany({
          where: {
            createdAt: {
              gte: new Date(today),
              lt: new Date(tomorrow),
            },
          },
        });

        const yesterDayOrders = await prisma.order.findMany({
          where: {
            createdAt: {
              gte: new Date(yesterday),
              lt: new Date(today),
            },
          },
        });

        const monthDate = new Date();
        const currMonth = `${monthDate.getFullYear()}-${
          monthDate.getMonth() + 1
        }`;
        monthDate.setDate(new Date(currMonth).getMonth() + 1);
        const nextMonth = `${monthDate.getFullYear()}-${
          monthDate.getMonth() + 2
        }`;
        monthDate.setDate(new Date(currMonth).getMonth() - 1);
        const beforeMonth = `${monthDate.getFullYear()}-${monthDate.getMonth()}`;

        const currMonthOrders = await prisma.order.findMany({
          where: {
            createdAt: {
              gte: new Date(currMonth),
              lt: new Date(nextMonth),
            },
          },
        });

        const beforeMonthOrders = await prisma.order.findMany({
          where: {
            createdAt: {
              gte: new Date(beforeMonth),
              lt: new Date(currMonth),
            },
          },
        });

        const dailyTotal = todayOrders
          .filter((order) => order.status === "PROGRESS_FINISHIED")
          .reduce((prev, curr) => prev + curr.totalPrice, 0);
        const yesterdayTotal = yesterDayOrders
          .filter((order) => order.status === "PROGRESS_FINISHIED")
          .reduce((prev, curr) => prev + curr.totalPrice, 0);

        const monthlyTotal = currMonthOrders
          .filter((order) => order.status === "PROGRESS_FINISHIED")
          .reduce((prev, curr) => prev + curr.totalPrice, 0);
        const beforeMonthTotal = beforeMonthOrders
          .filter((order) => order.status === "PROGRESS_FINISHIED")
          .reduce((prev, curr) => prev + curr.totalPrice, 0);

        const dailyGrowthRate =
          yesterdayTotal === 0
            ? 100
            : Number(
                ((dailyTotal - yesterdayTotal) / yesterdayTotal).toFixed(2)
              ) * 100;

        const monthlyGrowthRate =
          beforeMonthTotal === 0
            ? 100
            : Number(
                ((monthlyTotal - beforeMonthTotal) / beforeMonthTotal).toFixed(
                  2
                )
              ) * 100;
        return {
          dailyTotal,
          monthlyTotal,
          dailyGrowthRate,
          monthlyGrowthRate,
        };
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
  getOrdersMonthly: t.procedure
    .output(outputGetMonthlyOrders)
    .query(async () => {
      try {
        const date = new Date();
        const year = date.getFullYear();
        const jan = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-1`),
              lt: new Date(`${year}-2`),
            },
          },
        });
        const feb = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-2`),
              lt: new Date(`${year}-3`),
            },
          },
        });
        const mar = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-3`),
              lt: new Date(`${year}-4`),
            },
          },
        });
        const apr = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-4`),
              lt: new Date(`${year}-5`),
            },
          },
        });
        const may = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-5`),
              lt: new Date(`${year}-6`),
            },
          },
        });
        const jun = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-6`),
              lt: new Date(`${year}-7`),
            },
          },
        });
        const jul = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-7`),
              lt: new Date(`${year}-8`),
            },
          },
        });
        const aug = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-8`),
              lt: new Date(`${year}-9`),
            },
          },
        });
        const sep = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-9`),
              lt: new Date(`${year}-10`),
            },
          },
        });
        const oct = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-10`),
              lt: new Date(`${year}-11`),
            },
          },
        });
        const nov = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-11`),
              lt: new Date(`${year}-12`),
            },
          },
        });
        const dec = await prisma.order.findMany({
          where: {
            status: "PROGRESS_FINISHIED",
            createdAt: {
              gte: new Date(`${year}-12`),
            },
          },
        });
        return {
          jan,
          feb,
          mar,
          apr,
          may,
          jun,
          jul,
          aug,
          sep,
          oct,
          nov,
          dec,
        };
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
  delete: t.procedure.mutation(async ({ input }) => {}),
  edit: t.procedure.mutation(async ({ input }) => {}),
});
