import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const companyRouter = createTRPCRouter({
  fetchWorkerGroups: protectedProcedure.query(async ({ ctx }) => {
    const workerGroup = await ctx.prisma.companyWorkerGroup.findMany({
      where: {
        company: {
          adminId: ctx.session.user.id,
        },
      },
      include: {
        workers: true,
      },
    });

    return workerGroup.map((el) => {
      return {
        ...el,
        workers: el.workers.length,
      };
    });
  }),

  fetchUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      where: {
        Company: {
          adminId: ctx.session.user.id,
        },
      },
    });
  }),

  removeWorkerGroup: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.companyWorkerGroup.delete({
      where: {
        id: input,
      },
    });
  }),

  addWorkers: protectedProcedure
    .input(
      z.object({
        users: z.array(z.string()),
        groupId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.userDetails.updateMany({
        where: {
          id: {
            in: input.users,
          },
        },
        data: {
          workerGroupId: input.groupId,
        },
      });
    }),

  setEmailFrequency: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.company.update({
      where: {
        adminId: ctx.session.user.id,
      },
      data: {
        phishingEmailFrequencyDays: input,
        lastPhishingEmailSendTime: new Date(),
      },
    });
  }),

  getEmailFrequency: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.company.findFirst({
      where: {
        adminId: ctx.session.user.id,
      },
      select: {
        phishingEmailFrequencyDays: true,
        lastPhishingEmailSendTime: true,
      },
    });
  }),

  addWorkerGroup: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        color: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const companyByAuthor = await ctx.prisma.company.findFirst({
        where: {
          adminId: ctx.session.user.id,
        },
      });
      if (!companyByAuthor) return;

      return await ctx.prisma.companyWorkerGroup.create({
        data: {
          name: input.name,
          color: input.color,
          companyId: companyByAuthor.id,
        },
      });
    }),
});
