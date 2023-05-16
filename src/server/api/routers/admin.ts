import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  loadData: protectedProcedure.query(async ({ ctx }) => {
    const company = await ctx.prisma.company.findUnique({
      where: {
        adminId: ctx.session.user.id,
      },
    });

    const completedRegistration = !!company;
    console.log("completedRegistration", completedRegistration);

    return { completedRegistration };
  }),

  createCompany: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const company = await ctx.prisma.company.create({
      data: {
        phishingEmailFrequencyDays: 7,
        adminId: ctx.session.user.id,
        name: input,
      },
    });

    return company;
  }),
});
