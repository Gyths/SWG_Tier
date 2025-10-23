// server/api/routers/auth.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Buscar usuario por email
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Usuario o contraseña incorrectos",
        });
      }

      // Verificar contraseña
      // IMPORTANTE: En producción deberías usar bcrypt.compare()
      // Por ahora comparamos directamente (solo para desarrollo)
      if (user.hashedPassword !== input.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Usuario o contraseña incorrectos",
        });
      }

      // Retornar datos del usuario (sin la contraseña)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }),

  // Obtener usuario por ID (para mostrar en comentarios)
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuario no encontrado",
        });
      }

      return user;
    }),

  // Obtener múltiples usuarios por IDs (para comentarios)
  getByIds: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return users;
    }),

  // Obtener usuario actual (verificar si está logueado)
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    // Aquí puedes implementar lógica de sesión más adelante
    // Por ahora retornamos null
    return null;
  }),
});