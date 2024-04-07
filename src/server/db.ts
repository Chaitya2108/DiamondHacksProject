import type { IClass, IStudent, ISubmission, ITestCase } from "./types";

const classes = new Map<string, IClass>();

export const db = {
    instructor: {
        createClass: async (name: string) => {
            // very safe
            const joinCode = Math.random().toString(36).substring(2, 8);
            classes.set(joinCode, {
                name,
                students: [],
                assignment: null,
            });
            return joinCode;
        },

        pushAssignment: async (joinCode: string, prompt: string, starterCode: string, tests: ITestCase[]) => {
            const classToJoin = classes.get(joinCode);
            // check class exists
            if (classToJoin === undefined) {
                throw new Error("Class does not exist");
            }
            classToJoin.assignment = { prompt, starterCode, tests, submissions: new Map<string, ISubmission>() }
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

        getAssignment: async(joinCode: string) => {
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

        submitAssignment: async(joinCode: string, studentId: string, submission: string) => {
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
                // cancel or remove previous submission
            }
            const submissionId = crypto.randomUUID()
            submissions.set(studentId, { id: submissionId, studentId, submission, results: null });
            // TODO run code
        }
    },
}