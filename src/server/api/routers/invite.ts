import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const inviteRouter = createTRPCRouter({
  getInviteInfo: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const inviteData = await ctx.prisma.invite.findUnique({
      where: {
        id: input,
      },
    });

    return inviteData;
  }),

  acceptInvite: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const inviteData = await ctx.prisma.invite.findUnique({
      where: {
        id: input,
      },
    });

    if (!inviteData) {
      throw new Error("Invite not found");
    }

    const user = await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        Company: {
          connect: {
            id: inviteData.companyId,
          },
        },
      },
    });

    return user;
  }),
});
