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
    language: 'js' | 'py';
    tests: ITestCase[];
    submissions: Map<string, ISubmission>;
}

export interface ITestCase {
    input: (string | number)[];
    expected: string | number;
}

export interface ISubmission {
    id: string;
    studentId: string;
    submission: string;
    results: ITestCaseResult[] | null | string;
}

export interface ITestCaseResult {
    name: string;
    passed: boolean;
    msg: string | undefined;
}