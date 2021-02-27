import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Table,
    TableCaption,
    Thead,
    Tbody,
    Td,
    Th,
    Tr,
    Tfoot,
    useDisclosure,
    Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import TestCaseModal from './TestCase';

interface FormProps {}

const Form: React.FC<FormProps> = ({}) => {
    const [question, setQuestion] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [testCases, setTestCases] = useState<
        { input: string; output: string }[]
    >([]);

    const onSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    const addTestCase = (input: string, output: string) => {
        setTestCases([...testCases, { input, output }]);
        onClose();
    };

    return (
        <Box
            borderRadius="lg"
            p="10"
            h={{ lg: '60%', base: '60%' }}
            w={{ lg: '60%', base: '95%' }}
            mx="auto"
            my="5"
            bg="#ffffff"
        >
            <Heading textAlign="center">Define your assignment</Heading>
            <Box>
                <FormControl id="question">
                    <FormLabel fontSize="lg">Question</FormLabel>
                    <Input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Write a C Program to find the fibonacci sequence."
                        type="text"
                        borderColor="#ced4da"
                    />
                </FormControl>
                <FormControl id="Test Cases" my="5">
                    <FormLabel fontSize="lg">Test Cases</FormLabel>
                    <Table variant="striped" colorScheme="purple" p="5" w="80%">
                        <TableCaption>
                            Testcases to give your students
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th display={{ lg: 'block', base: 'none' }}>
                                    #
                                </Th>
                                <Th>Input</Th>
                                <Th>Expected Answer</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {testCases.map(({ input, output }, key) => (
                                <Tr key={key}>
                                    <Td display={{ lg: 'block', base: 'none' }}>
                                        {key + 1}
                                    </Td>
                                    <Td>{input}</Td>
                                    <Td>{output}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </FormControl>
                <TestCaseModal
                    isOpen={isOpen}
                    onClose={onClose}
                    addTestCase={addTestCase}
                />
                <Button
                    color="#ffffff"
                    bg="#8e2de2"
                    bgGradient="linear(to-r,#8e2de2, #4a00e0)"
                    _hover={{
                        bg: '#8e2de2',
                        bgGradient: 'linear(to-r,#8e2de2, #4a00e0)',
                    }}
                    onClick={onOpen}
                >
                    Create Test Case
                </Button>
            </Box>
        </Box>
    );
};

export default Form;
