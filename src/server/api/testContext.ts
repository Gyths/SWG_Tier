import { initTRPC, type inferAsyncReturnType } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "../db"; // Importa la DB, que sí necesitamos

// Contexto de prueba: Solo incluye la DB, no la sesión de autenticación.
export const createTestContext = () => ({
  db,
  session: null, // Proporciona un campo 'session' nulo para tipado
});

export type TestContext = inferAsyncReturnType<typeof createTestContext>;

// Inicialización de tRPC de PRUEBA
const t = initTRPC.context<TestContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

// Componentes de PRUEBA
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure; // No necesitas el timingMiddleware aquí