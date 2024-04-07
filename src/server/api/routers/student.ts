import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { db } from "~/server/db";

export const studentRouter = createTRPCRouter({
    join: publicProcedure
        .input(z.object({id: z.string(), name: z.string(), joinCode: z.string() }))
        .mutation(async ({ input }) => {
            try {
                await db.student.joinClass({ id: input.id, name: input.name }, input.joinCode);
            } catch(e) {
                throw e;
            }
            const assignment = await db.student.getAssignment(input.joinCode);
            return assignment;
        }),
    assignment: publicProcedure
        .input(z.object({joinCode: z.string() }))
        .query(async ({ input }) => {
            const assignment = await db.student.getAssignment(input.joinCode);
            return assignment;
        }),
    submit: publicProcedure
        .input(z.object({ joinCode: z.string(), studentId: z.string(), submission: z.string() }))
        .mutation(async ({ input }) => {
            await db.student.submitAssignment(input.joinCode, input.studentId, input.submission);
        }),
    viewResults: publicProcedure
        .input(z.object({ joinCode: z.string(), studentId: z.string() }))
        .query(async ({ input }) => {
            // TODO get run results
        }),
});