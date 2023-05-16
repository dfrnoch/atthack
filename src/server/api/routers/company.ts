import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const companyRouter = createTRPCRouter({
    fetchWorkerGroups: protectedProcedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.companyWorkerGroup.findMany({
                where: {
                    company: {
                        adminId: ctx.session.user.id
                    }
                }
            });
        }),

    addWorkerGroup: protectedProcedure
        .input(z.object({
            name: z.string(),
            color: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const companyByAuthor = await ctx.prisma.company.findFirst({
                where: {
                    adminId: ctx.session.user.id
                }
            });
            if(!companyByAuthor) return;

            return await ctx.prisma.companyWorkerGroup.create({
                data: {
                    name: input.name,
                    color: input.color,
                    companyId: companyByAuthor.id
                }
            });
        }),
});