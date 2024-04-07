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
        .input(z.object({
            joinCode: z.string(),
            prompt: z.string(),
            starterCode: z.string(),
            language: z.enum(['js', 'py']),
            tests: z.array(z.object({
                input: z.string(),
                expected: z.string()
            }))
        }))
        .mutation(async ({ input }) => {
            const transformedTests = input.tests.map(test => {
                // input comma sepatrated
                const input = test.input.split(',').map(i => {
                    const trimmed = i.trim();
                    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                        return trimmed.slice(1, -1);
                    } else {
                        return parseFloat(trimmed);
                    }
                })

                const expected = test.expected.trim().startsWith('"') && test.expected.trim().endsWith('"') ? test.expected.trim().slice(1, -1) : parseFloat(test.expected.trim());

                return {
                    input,
                    expected
                }
            })
            .filter(i => i.expected !== null && i.input !== null);
            await db.instructor.pushAssignment(input.joinCode, input.prompt, input.starterCode, input.language, transformedTests);
        }),
    viewScores: publicProcedure
        .input(z.object({ joinCode: z.string() }))
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
