import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IAssignment } from '../../interfaces';
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

    useEffect(() => {
        const ENDPOINT = 'http://localhost:5000/';
        socket = io(ENDPOINT);
        socket.emit('addStudent', details, (assignment: IAssignment) => {
            const {
                desc,
                className,
                inputDesc,
                question,
                outputDesc,
                testCases,
            } = assignment;
            console.log(desc);
            setQuestion(question);
            setDesc(desc);
            setClassName(className);
            setInputDesc(inputDesc);
            setOutputDesc(outputDesc);
            setTestCases(testCases);
        });
    }, []);

    return (
        <Box className="amin-gradient">
            <Box padding="10px">
                <Grid
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
                        <Editor />
                    </GridItem>
                    <GridItem colSpan={5} rowSpan={3} bg="tomato" />
                </Grid>
            </Box>
        </Box>
    );
};

export default Student;
