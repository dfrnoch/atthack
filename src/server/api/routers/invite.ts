import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const inviteRouter = createTRPCRouter({
  getInviteInfo: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const inviteData = await ctx.prisma.invite.findUnique({
      where: {
        id: input,
      },
    });

    return inviteData;
  }),

  listInvites: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.invite.findMany({
        where: {
          Company: {
            adminId: ctx.session.user.id
          }
        }
      });
    }),

  removeInvite: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.invite.delete({
        where: {
          id: input
        }
      });
    }),

  createInvite: protectedProcedure
    .input(
      z.object({
        expiresAt: z.date(),
        limit: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const company = await ctx.prisma.company.findFirst({
        where: {
          adminId: ctx.session.user.id,
        },
      });
      
      if (!company)
        throw new TRPCError({
          message: "You don't own a company!",
          code: "BAD_REQUEST",
        });

      return await ctx.prisma.invite.create({
        data: {
          expiresAt: input.expiresAt,
          limit: input.limit,
          companyId: company.id,
        },
      });
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
