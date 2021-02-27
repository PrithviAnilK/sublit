import React, { FC } from 'react';
import { Stack, Box, Heading, Text } from '@chakra-ui/react';

interface QuestionsProps {
    desc: string;
    inputDesc: string;
    outputDesc: string
    question: string;
    className: string;
    example: { input: string; output: string };
}

const Questions: FC<QuestionsProps> = ({
    inputDesc,
    outputDesc,
    question,
    desc,
    className,
    example,
}) => {
    return (
        <Box>
            <Stack>
                <Box
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    background="white"
                    borderRadius="lg"
                >
                    <Heading fontSize="2xl">{className}</Heading>
                </Box>
                <Box
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    background="white"
                    borderRadius="lg"
                >
                    <Heading fontSize="xl">{question}</Heading>
                    <Text mt={4}>
                        {desc}
                    </Text>
                </Box>
                <Box
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    background="white"
                    borderRadius="lg"
                >
                    <Heading fontSize="xl">Inputs</Heading>
                    <Text mt={4}>{inputDesc}</Text>
                </Box>
                <Box
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    background="white"
                    borderRadius="lg"
                >
                    <Heading fontSize="xl">Output</Heading>
                    <Text mt={4}>{outputDesc}</Text>
                </Box>
                <Box
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    background="white"
                    borderRadius="lg"
                >
                    <Heading fontSize="xl">Example</Heading>
                    <Box my="4">
                        <Text fontWeight="bold">Input</Text>
                        <Text my={2}>{example.input}</Text>
                        <Text fontWeight="bold">Output</Text>
                        <Text my={2}>{example.output}</Text>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default Questions;
