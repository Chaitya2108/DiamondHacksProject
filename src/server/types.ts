export interface ISubmission {
    id: string;
    studentId: string;
    submission: string;
    result: IResult | null;
}

export interface IResult {
    result: string | null;
    error: string | null;
}

export interface IAssignment {
    question: string;
    tests: string[];
    submissions: Map<string, ISubmission>;
}

export interface IStudent {
    id: string;
    name: string;
}

export interface IClass {
    name: string;
    students: IStudent[];
    assignment: IAssignment | null;
}