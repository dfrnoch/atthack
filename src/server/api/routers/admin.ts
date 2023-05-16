import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  loadData: protectedProcedure.query(async ({ ctx }) => {
    const userDetails = await ctx.prisma.userDetails.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });

    const completedRegistration = !!userDetails?.companyId;
    return { completedRegistration };
  }),

  createCompany: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const company = await ctx.prisma.company.create({
      data: {
        adminId: ctx.session.user.id,
        name: input,
      },
    });

    return company;
  }),
});
