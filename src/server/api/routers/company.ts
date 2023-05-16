import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const companyRouter = createTRPCRouter({
  fetchWorkerGroups: protectedProcedure.query(async ({ ctx }) => {
    const workerGroup = await ctx.prisma.companyWorkerGroup.findMany({
      where: {
        company: {
          adminId: ctx.session.user.id,
        },
      },
      include: {
        workers: true
      }
    });

    return workerGroup.map(el => {
        return {
            ...el,
            workers: el.workers.length
        }
    });
  }),

  removeWorkerGroup: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
        return await ctx.prisma.companyWorkerGroup.delete({
            where: {
                id: input
            }
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
