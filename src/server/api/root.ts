import { createTRPCRouter } from "./trpc";
import { excersiceRouter } from "./routers/excercise";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  exercise: excersiceRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
