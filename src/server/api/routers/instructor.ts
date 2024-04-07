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
        .input(z.object({ joinCode: z.string(), prompt: z.string(), starterCode: z.string(), tests: z.array(z.object({ input: z.string(), output: z.string() })) }))
        .mutation(async ({ input }) => {
            await db.instructor.pushAssignment(input.joinCode, input.prompt, input.starterCode, input.tests);
        }),
    viewScores: publicProcedure
        .input(z.object({ joinCode: z.string()}))
        .query(async ({ input }) => {
            // TODO get scores
        }),
    clear: publicProcedure
        .input(z.object({ joinCode: z.string() }))
        .mutation(async ({ input }) => {
            // TODO clear assignment
        }),
});