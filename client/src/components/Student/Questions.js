import React from 'react';
import { Stack, Box, Heading, Text } from '@chakra-ui/react';
function Questions() {
    return (
        <div>
            <Stack>
                <Box p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="xl">Add Two Numbers</Heading>
                </Box>
                <Box p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="l">Problem Statement</Heading>
                    <Text mt={4}>
                        Shivam is the youngest programmer in the world, he is
                        just 12 years old. Shivam is learning programming and
                        today he is writing his first program.Program is very
                        simple, given two integers A and B, write a program to
                        add these two numbers.
                    </Text>
                </Box>
                <Box p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="l">Inputs</Heading>
                    <Text mt={4}>
                        The first line contains an integer T, the total number
                        of test cases. Then follow T lines, each line contains
                        two Integers A and B.
                    </Text>
                </Box>
                <Box p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="l">Output</Heading>
                    <Text mt={4}>
                        For each test case, add A and B and display it in a new
                        line.
                    </Text>
                </Box>
                <Box p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="l">Example</Heading>
                    <Text mt={4}>Input 3 1 2 100 200 10 40</Text>
                    <Text mt={4}>Output 3 300 50</Text>
                </Box>
            </Stack>
        </div>
    );
}

export default Questions;
