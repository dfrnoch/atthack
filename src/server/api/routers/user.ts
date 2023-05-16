import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  createUserData: protectedProcedure
    .input(
      z.object({
        age: z.number(),
        gender: z.string(),
        hobby: z.string(),
        education: z.string().optional(),
      }),
    )
    .query(({ input, ctx }) => {
      console.log("input", input);

      return ctx.auth.userId;
    }),
});
