import { Box } from '@chakra-ui/react';
import React from 'react';
import SubmissionsView from '../components/Teacher/SubmissionsView';

const Submissions = () => {
    return (
        <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            className="amin-gradient"
            minH="100vh"
        >
            <SubmissionsView />
        </Box>
    );
};

export default Submissions;
