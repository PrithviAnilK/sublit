import React, { useRef, useState, useEffect, FC } from 'react';
import AceEditor from 'react-ace';
import { io, Socket } from 'socket.io-client';
import axios from '../../utils/axios';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    Button,
    Box,
    PopoverArrow,
    Portal,
    PopoverCloseButton,
} from '@chakra-ui/react';
import history from '../../utils/history';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import { BASEURL } from '../../utils/config';

const score = (
    outputs: string[],
    testCases: { input: string; output: string }[]
) => {
    var correctVal = 0;
    for (var i in outputs) {
        correctVal += Number(outputs[i] === testCases[i].output);
    }
    return correctVal;
};

interface EditorProps {
    details: any;
    testInput: string;
    setTestOutput: (s: string) => void;
    testCases: { input: string; output: string }[];
}

let socket: Socket;
const Editor: FC<EditorProps> = ({
    testCases,
    testInput,
    details,
    setTestOutput,
}) => {
    const [code, setCode] = useState('');
    const codeRef = useRef(null);
    const [testIsLoading, setTestLoading] = useState<boolean>(false);
    const [submitIsLoading, setSubmitLoading] = useState<boolean>(false);

    useEffect(() => {
        socket = io(BASEURL);
    }, []);

    const onSubmit = async () => {
        setSubmitLoading(true);
        var outputs = [];
        for (const key of Object.keys(testCases)) {
            const data = {
                language: 'python3',
                script: code,
                // @ts-ignore
                stdin: testCases[key].input,
            };
            try {
                const {
                    data: { output },
                } = await axios.post('/code', data);
                outputs.push(output.substring(0, output.length - 1));
            } catch (error) {
                console.log(error);
            }
        }
        const scoreVal = score(outputs, testCases);
        socket.emit(
            'submit',
            {
                ...details,
                submitted: true,
                score: scoreVal,
            },
            () => {
                setSubmitLoading(false);
                history.push('/submitted');
            }
        );
    };

    const onTest = async () => {
        setTestLoading(true);
        const config = {
            language: 'python3',
            script: code,
            stdin: testInput,
        };
        try {
            const { data } = await axios.post('/code', config);
            console.log(data);
            setTestOutput(data.output.substring(0, data.output.length - 1));
        } catch (error) {
            console.log(error);
        }
        setTestLoading(false);
    };

    return (
        <Box pt="2" w="82.5%" background="white" borderRadius="lg">
            <AceEditor
                ref={codeRef}
                mode="python"
                theme="github"
                onChange={setCode}
                value={code}
                name="UNIQUE_ID_OF_DIV"
                height="47.5vh"
                fontSize={18}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
            />
            <Box py="5">
                <Button
                    mx="2"
                    size="sm"
                    color="#ffffff"
                    bg="#8e2de2"
                    bgGradient="linear(to-r,#8e2de2, #4a00e0)"
                    _hover={{
                        bg: '#8e2de2',
                        bgGradient: 'linear(to-r,#8e2de2, #4a00e0)',
                    }}
                    isLoading={testIsLoading}
                    onClick={onTest}
                >
                    Test
                </Button>
                <Popover>
                    <PopoverTrigger>
                        <Button
                            mx="2"
                            size="sm"
                            color="#ffffff"
                            bg="#8e2de2"
                            bgGradient="linear(to-r,#8e2de2, #4a00e0)"
                            _hover={{
                                bg: '#8e2de2',
                                bgGradient: 'linear(to-r,#8e2de2, #4a00e0)',
                            }}
                        >
                            Submit
                        </Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>
                                Are you sure you want to submit?
                            </PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Button
                                    size="sm"
                                    color="#ffffff"
                                    bg="#8e2de2"
                                    bgGradient="linear(to-r,#8e2de2, #4a00e0)"
                                    _hover={{
                                        bg: '#8e2de2',
                                        bgGradient:
                                            'linear(to-r,#8e2de2, #4a00e0)',
                                    }}
                                    isLoading={submitIsLoading}
                                    onClick={onSubmit}
                                >
                                    Yes
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
            </Box>
        </Box>
    );
};

export default Editor;
