import { z } from "zod";
import {createTRPCRouter,publicProcedure} from "~/server/api/trpc";

export const burgerRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1),
                description: z.string().optional(),
                image: z.string().optional(),
                grade: z.number().optional(),
                priceAlone: z.number().optional(),
                priceMeal: z.number().optional(),
                priceDiscount: z.number().optional(),
                gradeDate: z.date().optional(),
                restaurantId: z.string(),
            })
        )
        .mutation(async({ctx,input})=>{
            return await ctx.db.burger.create({
                data: input,
            });
        }),
    
    list: publicProcedure
        .input(z.object({restaurantId:z.string()}))
        .query(async({ctx,input})=>{
        return await ctx.db.burger.findMany({
            where:{
                restaurantId: input.restaurantId
            },
            include: {
                comments: true,
            },
            orderBy: {grade:"asc"},
        });
    }),

    getById: publicProcedure
        .input(z.object({id:z.string()}))
        .query(async({ctx,input})=>{
            return await ctx.db.burger.findUnique({
                where:{id:input.id},
                // Ensure comments are included
                include:{
                    comments: {
                        orderBy: { date: 'desc' } // Display newest comments first
                    }
                }, 
            });
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().optional(),
                description: z.string().optional(),
                image: z.string().optional(),
                grade: z.number().optional(),
                priceAlone: z.number().optional(),
                priceMeal: z.number().optional(),
                priceDiscount: z.number().optional(),
                gradeDate: z.date().optional(),
            })
        )
        .mutation(async({ctx,input})=>{
            const{id,...data} = input;
            return await ctx.db.burger.update({
                where: {id},
                data,
            });
        }),

    delete: publicProcedure
        .input(z.object({id: z.string()}))
        .mutation(async({ctx,input})=>{
            return await ctx.db.burger.delete({
                where: {id: input.id}
            });
        }),
});