import { Box } from '@chakra-ui/react';
import React from 'react';
import Form from '../components/Form';

interface LandingProps {}

const Landing: React.FC<LandingProps> = ({}) => {
    console.log(process.env);
    return (
        <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            className="amin-gradient"
            minH="100vh"
        >
            <Form />
        </Box>
    );
};

export default Landing;
