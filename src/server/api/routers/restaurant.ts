import { z } from "zod";
import {createTRPCRouter,publicProcedure} from "~/server/api/trpc";

export const restaurantRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1),
                grade: z.number().optional(),
                gradeDate: z.date().optional(),
                notes: z.string().optional(),
                location: z.string().optional(),
                justDelivery: z.boolean().optional(),
                image: z.string().optional(),
            })
        )
        .mutation(async({ input, ctx })=>{
            return await ctx.db.restaurant.create({
                data:input,
            });
        }),
    
    list: publicProcedure.query(async({ctx})=>{
        return await ctx.db.restaurant.findMany({
            include: {burgers: true},
        });
    }),

    getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.restaurant.findUnique({
        where: { id: input.id },
        include: {
          burgers: {
            // Optional: order burgers
            orderBy: { grade: 'desc' }, 
          },
        },
      });
    }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().optional(),
                grade: z.number().optional(),
                gradeDate: z.date().optional(),
                notes: z.string().optional(),
                location: z.string().optional(),
                justDelivery: z.boolean().optional(),
            })
        )
        .mutation(async({input,ctx})=>{
            const{id,...data} = input;
            return await ctx.db.restaurant.update({
                where: {id},
                data,
            });
        }),
    
    delete: publicProcedure
        .input(z.object({id:z.string()}))
        .mutation(async({input,ctx})=>{
            return await ctx.db.restaurant.delete({
                where:{id: input.id},
            });
        }),
});