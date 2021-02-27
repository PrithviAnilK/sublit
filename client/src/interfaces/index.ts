export interface IAssignment {
    className: string;
    classCode: string;
    question: string;
    desc: string;
    inputDesc: string;
    outputDesc: string;
    testCases: { input: string; output: string }[];
    students: IStudent[];
}

export interface IStudent {
    name: string;
    srn: string;
    submitted: boolean;
    code: string;
    score: number;
    classCode: string;
}
