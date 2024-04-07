import { runTests } from "./queue";
import type { IClass, IStudent, ISubmission, ITestCase, ITestCaseResult } from "./types";

const classes = new Map<string, IClass>();

export const db = {
    instructor: {
        createClass: async (name: string) => {
            // very safe
            const joinCode = Math.random().toString(36).substring(2, 8);
            classes.set(joinCode, {
                name: name,
                students: [],
                assignment: null,
            });
            return joinCode;
        },

        pushAssignment: async (joinCode: string, prompt: string, starterCode: string, language: 'js' | 'py', tests: ITestCase[]) => {
            const classToJoin = classes.get(joinCode);
            // check class exists
            if (classToJoin === undefined) {
                throw new Error("Class does not exist");
            }
            classToJoin.assignment = { prompt, starterCode, language, tests, submissions: new Map<string, ISubmission>() }
        },

        clearAssignment: async (joinCode: string) => {
            const classToJoin = classes.get(joinCode);
            // check class exists
            if (classToJoin === undefined) {
                throw new Error("Class does not exist");
            }
            classToJoin.assignment = null;
        },

        viewScores: async (joinCode: string) => {
            const classToJoin = classes.get(joinCode);
            // check class exists
            if (classToJoin === undefined) {
                throw new Error("Class does not exist");
            }
            if (classToJoin.assignment === null) {
                throw new Error("No assignment to view scores for");
            }
            const numPassed = Array<number>(classToJoin.assignment.tests.length).fill(0);
            let numTotal = 0;
            for (const submission of classToJoin.assignment.submissions.values()) {
                if (submission.results === null || typeof(submission.results) === 'string') {
                    continue;
                }
                numTotal += 1;
                for (const [i, result] of submission.results.entries()) {
                    if (result.passed) {
                        numPassed[i] += 1;
                    }
                }
            }
            return { numPassed, numTotal };
        }
    },
    student: {
        joinClass: async (student: IStudent, joinCode: string) => {
            const classToJoin = classes.get(joinCode);
            // check class exists
            if (classToJoin === undefined) {
                throw new Error("Class does not exist");
            }
            // check student already in class
            const alreadyJoined = classToJoin.students.some(classStudent => classStudent.id === student.id);
            if (alreadyJoined) {
                throw new Error("Already joined this class");
            }

            classToJoin.students.push(student);
        },

        getAssignment: async (joinCode: string) => {
            const classToJoin = classes.get(joinCode);
            // check class exists
            if (classToJoin === undefined) {
                throw new Error("Class does not exist");
            }
            if (classToJoin.assignment === null) {
                return null;
            }
            return { prompt: classToJoin.assignment.prompt, starterCode: classToJoin.assignment.starterCode };
        },

        submitAssignment: async (joinCode: string, studentId: string, submission: string) => {
            const classToJoin = classes.get(joinCode);
            // check class exists
            if (classToJoin === undefined) {
                throw new Error("Class does not exist");
            }
            if (classToJoin.assignment === null) {
                throw new Error("No assignment to submit for");
            }
            const submissions = classToJoin.assignment.submissions;
            if (submissions.get(studentId)) {
                // TODO cancel or remove previous submission
            }
            const submissionId = crypto.randomUUID()
            const submissionObj: ISubmission = { id: submissionId, studentId, submission, results: null };
            submissions.set(studentId, submissionObj);
            let testResults;
            try {
                testResults = await runTests({ id: submissionId, lang: classToJoin.assignment.language, tests: classToJoin.assignment.tests, submission});
                submissionObj.results = testResults as ITestCaseResult[];
            } catch (e) {
                submissionObj.results = "Error";
            }
        },

        viewResults: async (joinCode: string, studentId: string) => {
            const classToJoin = classes.get(joinCode);
            // check class exists
            if (classToJoin === undefined) {
                throw new Error("Class does not exist");
            }
            const assignment = classToJoin.assignment;
            if (assignment === null) {
                throw new Error("No assignment to view submission for");
            }
            const submissions = assignment.submissions;
            const submission = submissions.get(studentId);
            if (submission === undefined) {
                throw new Error("No submission for this student exists");
            }
            const results = submission.results;
            if (results === null) {
                throw new Error("No results at this time");
            }
            return { results };
        }
    },
}