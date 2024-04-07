export interface IClass {
    name: string;
    students: IStudent[];
    assignment: IAssignment | null;
}

export interface IStudent {
    id: string;
    name: string;
}

export interface IAssignment {
    prompt: string;
    starterCode: string;
    tests: ITestCase[];
    submissions: Map<string, ISubmission>;
}

export interface ITestCase {
    input: string;
    output: string;
}

export interface ISubmission {
    id: string;
    studentId: string;
    submission: string;
    results: ITestCaseResult[] | null;
}

export interface ITestCaseResult {
    name: string;
    passed: boolean;
    message: string | undefined;
}