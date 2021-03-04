import { Box, Grid, GridItem, Heading, Input, Divider } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IAssignment } from '../../interfaces';
import { BASEURL } from '../../utils/config';
import Editor from './Editor';
import Questions from './Questions';

let socket: Socket;
const Student = () => {
    const { details } = useStoreState((store: any) => store.auth);
    const [className, setClassName] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [inputDesc, setInputDesc] = useState<string>('');
    const [outputDesc, setOutputDesc] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [testCases, setTestCases] = useState<
        { input: string; output: string }[]
    >([{ input: '', output: '' }]);
    const [testInput, setTestInput] = useState<string>('');
    const [testOutput, setTestOutput] = useState<string>('');

    useEffect(() => {
        socket = io(BASEURL);
        socket.emit('addStudent', details, (assignment: IAssignment) => {
            const {
                desc,
                className,
                inputDesc,
                question,
                outputDesc,
                testCases,
            } = assignment;
            setQuestion(question);
            setDesc(desc);
            setClassName(className);
            setInputDesc(inputDesc);
            setOutputDesc(outputDesc);
            setTestCases(testCases);
        });
    }, [details]);

    return (
        <Box className="amin-gradient">
            <Box padding="10px">
                <Grid
                    p="5"
                    h="100vh"
                    templateRows="repeat(10, 1fr)"
                    templateColumns="repeat(10, 1fr)"
                    gap={4}
                >
                    <GridItem rowSpan={10} colSpan={4}>
                        <Questions
                            desc={desc}
                            className={className}
                            question={question}
                            outputDesc={outputDesc}
                            inputDesc={inputDesc}
                            example={testCases[0]}
                        />
                    </GridItem>
                    <GridItem colSpan={6} rowSpan={6}>
                        <Editor
                            details={details}
                            testInput={testInput}
                            setTestOutput={setTestOutput}
                            testCases={testCases}
                        />
                    </GridItem>
                    <GridItem
                        rowSpan={3}
                        colSpan={5}
                        padding="5"
                        bg="white"
                        borderRadius="lg"
                    >
                        <Box>
                            <Heading size="lg">Test your input</Heading>
                            <Divider color="#ced4da" my="2" />
                            <Heading my="2" fontSize="md">
                                Input
                            </Heading>
                            <Input
                                value={testInput}
                                onChange={(e) => setTestInput(e.target.value)}
                                borderColor="#ced4da"
                            />
                            <Heading my="2" fontSize="md">
                                Output
                            </Heading>
                            <Input
                                value={testOutput}
                                readOnly
                                borderColor="#ced4da"
                            />
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    );
};

export default Student;
