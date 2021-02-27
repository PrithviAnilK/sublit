interface IAssignment {
    className: string;
    classCode: string;
    question?: string;
    inputDesc?: string;
    outputDesc?: string;
    testCases?: { input: string; output: string }[];
}

let Assignments: IAssignment[] = [];

const createAssignment = (className: string, classCode: string) => {
    Assignments.push({ className, classCode });
};

const addQuestion = (data: {
    classCode: string;
    question: string;
    inputDesc: string;
    outputDesc: string;
    testCases: { input: string; output: string }[];
}) => {
    const { inputDesc, outputDesc, question, testCases, classCode } = data;
    Assignments = Assignments.map((ass) => {
        if (ass.classCode === classCode) {
            return {
                ...ass,
                inputDesc,
                outputDesc,
                question,
                testCases,
            };
        } else {
            return ass;
        }
    });
};
