import { Box } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';
import React from 'react';
import TeacherView from '../components/Teacher/TeacherView';
import Student from '../components/Student/StudentView';

interface ClassProps {}

const Class: React.FC<ClassProps> = ({}) => {
    const {
        user,
        details: { classCode, className, students },
    } = useStoreState((state: { auth: any }) => state.auth);
    if (user === 'Teacher')
        return (
            <Box
                display="flex"
                flexDir="column"
                justifyContent="center"
                className="amin-gradient"
                minH="100vh"
            >
                <TeacherView
                    classCode={classCode}
                    className={className}
                    students={students}
                />
            </Box>
        );
    else return <Student />;
};

export default Class;
