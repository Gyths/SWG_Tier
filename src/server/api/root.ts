import { postRouter } from "./routers/post";
import { createCallerFactory, createTRPCRouter } from "./trpc";
import { restaurantRouter } from "./routers/restaurant";
import { burgerRouter } from "./routers/burger";
import { commentRouter } from "./routers/comment";
import { authRouter } from "./routers/auth";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  restaurant: restaurantRouter,
  burger: burgerRouter,
  comment: commentRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
