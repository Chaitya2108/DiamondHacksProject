import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { db } from "~/server/db";

export const instructorRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input }) => {
            const joinCode = await db.instructor.createClass(input.name);
            return joinCode;
        }),
    
    assign: publicProcedure
    .input(z.object({ joinCode: z.string(), question: z.string(), tests: z.array(z.string()) }))
    .mutation(async ({ input }) => {
        await db.instructor.pushAssignment(input.joinCode, input.question, input.tests);
    }),
});