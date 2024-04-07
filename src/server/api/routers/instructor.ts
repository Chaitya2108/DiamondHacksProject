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
        .input(z.object({ joinCode: z.string(), prompt: z.string(), starterCode: z.string(), language: z.enum(['js', 'py']), tests: z.array(z.object({ input: z.string(), output: z.string() })) }))
        .mutation(async ({ input }) => {
            await db.instructor.pushAssignment(input.joinCode, input.prompt, input.starterCode, input.language, input.tests);
        }),
    viewScores: publicProcedure
        .input(z.object({ joinCode: z.string()}))
        .query(async ({ input }) => {
            const scores = await db.instructor.viewScores(input.joinCode);
            return scores;
        }),
    clear: publicProcedure
        .input(z.object({ joinCode: z.string() }))
        .mutation(async ({ input }) => {
            await db.instructor.clearAssignment(input.joinCode);
        }),
});