import { Box, Heading, Image } from '@chakra-ui/react';
import React from 'react';

const Landing = () => {
    return (
        <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            className="amin-gradient"
            minH="100vh"
        >
            <Heading color="white" marginX="auto">
                Thank you!
            </Heading>
            <Heading color="white" marginX="auto">
                {' '}
                Your code has been submitted.
            </Heading>
            <Box height="30%" padding="3" marginX="auto">
                <Image
                    height="30%"
                    src="https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif"
                />
            </Box>
        </Box>
    );
};

export default Landing;
