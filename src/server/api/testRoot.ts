import { createTRPCRouter } from "./testContext"; // 👈 Cambiado a testContext
import { restaurantRouter } from "./routers/restaurant";
import { burgerRouter } from "./routers/burger";
import { commentRouter } from "./routers/comment";

// La función createCaller debe usar el contexto de prueba
// (La estás usando en tu test: const caller = testAppRouter.createCaller({ db });)
// El router de prueba solo necesita los routers funcionales
export const testAppRouter = createTRPCRouter({
  restaurant: restaurantRouter,
  burger: burgerRouter,
  comment: commentRouter,
});