import { Box } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';
import React from 'react';
import TeacherView from '../components/Teacher/TeacherView';

interface ClassProps {}
const Class: React.FC<ClassProps> = ({}) => {
    const { user, details } = useStoreState(
        (state: { auth: any }) => state.auth
    );
    if (user === 'Teacher')
        return (
            <Box
                display="flex"
                flexDir="column"
                justifyContent="center"
                className="amin-gradient"
                minH="100vh"
            >
                <TeacherView />
            </Box>
        );
    else return <>student</>;
};

export default Class;
