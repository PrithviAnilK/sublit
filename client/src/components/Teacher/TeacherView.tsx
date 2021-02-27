import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import { useStoreActions } from 'easy-peasy';
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import history from '../../utils/history';
import TestCaseModal from './TestCase';

interface TeacherViewProps {
    classCode: string;
    className: string;
    students: [];
}

let socket: Socket;
const TeacherView: React.FC<TeacherViewProps> = ({
    classCode,
    className,
    students,
}) => {
    const [question, setQuestion] = useState<string>('');
    const [inputDesc, setInputDesc] = useState<string>('');
    const [outputDesc, setOutputDesc] = useState<string>('');
    const [testCases, setTestCases] = useState<
        { input: string; output: string }[]
    >([]);
    const [isLoading, setLoading] = useState(false);

    const { addAssignment } = useStoreActions(
        (actions: any) => actions.assignment
    );

    useEffect(() => {
        const ENDPOINT = 'http://localhost:5000/';
        socket = io(ENDPOINT);
        return () => {
            socket.off();
        };
    }, []);

    const onSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setLoading(true);
        addAssignment({
            question,
            inputDesc,
            outputDesc,
            testCases,
        });
        socket.emit(
            'addAssignment',
            {
                classCode,
                className,
                students,
                question,
                inputDesc,
                outputDesc,
                testCases,
            },
            () => {
                history.push(`/submissions/${classCode}`);
            }
        );
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
                <FormControl id="question" my="2">
                    <FormLabel fontSize="lg">Question</FormLabel>
                    <Input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Write a C Program to find the fibonacci sequence."
                        type="text"
                        borderColor="#ced4da"
                    />
                </FormControl>
                <FormControl id="input" my="2">
                    <FormLabel fontSize="lg">Input</FormLabel>
                    <Input
                        value={inputDesc}
                        onChange={(e) => setInputDesc(e.target.value)}
                        placeholder="N: number of elements to print out."
                        type="text"
                        borderColor="#ced4da"
                    />
                </FormControl>
                <FormControl id="output" my="2">
                    <FormLabel fontSize="lg">Output</FormLabel>
                    <Input
                        value={outputDesc}
                        onChange={(e) => setOutputDesc(e.target.value)}
                        placeholder="N spaced numbers where number[i] represents the ith fibonacci number."
                        type="text"
                        borderColor="#ced4da"
                    />
                </FormControl>
                <FormControl id="Test Cases" my="5">
                    <FormLabel fontSize="lg" display="flex">
                        <span>Test Cases</span>
                        <Button
                            color="#ffffff"
                            bg="#8e2de2"
                            size="sm"
                            bgGradient="linear(to-r,#8e2de2, #4a00e0)"
                            _hover={{
                                bg: '#8e2de2',
                                bgGradient: 'linear(to-r,#8e2de2, #4a00e0)',
                            }}
                            onClick={onOpen}
                            ml="auto"
                        >
                            Create
                        </Button>
                    </FormLabel>
                    <Table variant="striped" colorScheme="purple" p="5">
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
                                    <Td
                                        display={{
                                            lg: 'block',
                                            base: 'none',
                                        }}
                                    >
                                        <span>{key + 1}</span>
                                    </Td>
                                    <Td>{input}</Td>
                                    <Td>{output}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </FormControl>
                <Button
                    color="#ffffff"
                    bg="#8e2de2"
                    size="md"
                    bgGradient="linear(to-r,#8e2de2, #4a00e0)"
                    _hover={{
                        bg: '#8e2de2',
                        bgGradient: 'linear(to-r,#8e2de2, #4a00e0)',
                    }}
                    onClick={onSubmit}
                    isLoading={isLoading}
                >
                    Create Assignment
                </Button>
                <TestCaseModal
                    isOpen={isOpen}
                    onClose={onClose}
                    addTestCase={addTestCase}
                />
            </Box>
        </Box>
    );
};

export default TeacherView;
