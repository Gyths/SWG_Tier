import { z } from "zod";
import {createTRPCRouter,publicProcedure} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                content: z.string().min(1),
                grade: z.number().optional(),
                burgerId: z.string(),
                userId: z.string(),
                priceAlone: z.number().optional(),
                priceMeal: z.number().optional(),
                priceDiscount: z.number().optional(),
            })
        )
        .mutation(async({ctx,input})=>{
            const now = new Date()
            await ctx.db.comment.create({
                data: {
                    ...input,
                    date: now,
                },
            });
            
            const { priceAlone, priceMeal, priceDiscount, ...commentData } = input;
            const burgerId = commentData.burgerId;
           // --- STEP 2 & 3: Calculate New Burger Average Grade and Prepare Update Data ---

            // ... (Existing logic for fetching comments and calculating newAverageGrade) ...
            const commentsWithGrades = await ctx.db.comment.findMany({
                where: { burgerId: burgerId, grade: { not: null } },
                select: { grade: true },
            });

            const validGrades = commentsWithGrades
                .map(c => c.grade)
                .filter((g): g is number => g !== null && g !== undefined);

            const updateData: { 
                priceAlone?: number; 
                priceMeal?: number; 
                priceDiscount?: number; 
                grade?: number; 
                gradeDate?: Date; // 👈 Added gradeDate field
            } = {};

            // Calculate Burger Grade
            if (validGrades.length > 0) {
                const sum = validGrades.reduce((acc, grade) => acc + grade, 0);
                const newAverageGrade = parseFloat((sum / validGrades.length).toFixed(1));
                updateData.grade = newAverageGrade;
                // 🎯 Update the Burger's gradeDate
                updateData.gradeDate = now; 
            }
            
            // Price Update Logic (Latest non-zero price prevails)
            if (priceAlone && priceAlone > 0) updateData.priceAlone = priceAlone;
            if (priceMeal && priceMeal > 0) updateData.priceMeal = priceMeal;
            if (priceDiscount && priceDiscount > 0) updateData.priceDiscount = priceDiscount;

            // Execute Burger Update (if any change was detected)
            if (Object.keys(updateData).length > 0) {
                await ctx.db.burger.update({
                    where: { id: burgerId },
                    data: updateData,
                });
            }
            
            // --------------------------------------------------------------------------
            // --- STEP 4: Calculate and Update Restaurant Grade and gradeDate ---
            // --------------------------------------------------------------------------
            
            const burgerWithRestaurant = await ctx.db.burger.findUnique({
                where: { id: burgerId },
                select: { restaurantId: true },
            });

            const restaurantId = burgerWithRestaurant?.restaurantId;

            if (restaurantId) {
                const allRestaurantBurgers = await ctx.db.burger.findMany({
                    where: { restaurantId: restaurantId, grade: { not: null } },
                    select: { grade: true },
                });

                const validBurgerGrades = allRestaurantBurgers
                    .map(b => b.grade)
                    .filter((g): g is number => g !== null && g !== undefined && g > 0);
                
                const restaurantUpdateData: { grade?: number; gradeDate?: Date } = {};
                
                // Calculate Restaurant Average Grade
                if (validBurgerGrades.length > 0) {
                    const sum = validBurgerGrades.reduce((acc, grade) => acc + grade, 0);
                    const newRestaurantAverageGrade = parseFloat((sum / validBurgerGrades.length).toFixed(1)); 
                    
                    restaurantUpdateData.grade = newRestaurantAverageGrade;
                    // 🎯 Update the Restaurant's gradeDate
                    restaurantUpdateData.gradeDate = now;
                } else {
                    restaurantUpdateData.grade = 0;
                    restaurantUpdateData.gradeDate = now; // Optional: Update date even if grade is reset to 0
                }

                // Execute Restaurant Update
                await ctx.db.restaurant.update({
                    where: { id: restaurantId },
                    data: restaurantUpdateData,
                });
            }
            
            return { success: true, message: 'Comment created, Burger, and Restaurant details updated' };
        }),

    listByBurger:publicProcedure
        .input(z.object({burgerId: z.string()}))
        .query(async({ctx,input})=>{
            return await ctx.db.comment.findMany({
                where: {burgerId:input.burgerId},
                orderBy:{date:"asc"},
            });
        }),

    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.comment.findUnique({
                where: { id: input.id },
            });
        }),

 
    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                content: z.string().min(1),
                grade: z.number().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;
            return await ctx.db.comment.update({
                where: { id },
                data,
            });
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
        return await ctx.db.comment.delete({
            where: { id: input.id },
        });
    }),
})