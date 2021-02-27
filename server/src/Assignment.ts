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

let Assignments: IAssignment[] = [];

export const addAssignment = (assignment: IAssignment) => {
    Assignments.push(assignment);
};

export const addStudent = (student: IStudent) => {
    Assignments = Assignments.map((assignment) =>
        assignment.classCode === student.classCode
            ? { ...assignment, students: [...assignment.students, student] }
            : assignment
    );
};

export const getAssignment = (classCode: string) =>
    Assignments.find((ass) => ass.classCode === classCode);

export const getAssignments = () => Assignments;
