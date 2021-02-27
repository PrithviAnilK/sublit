import { Box, Button } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import server from '../../utils/server';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

const score = (outputs, testCases) => {
    var correctVal = 0;
    for (var i in outputs) {
        correctVal += outputs[i] === testCases[i].output;
    }
    return correctVal;
};

const Editor = ({ testCases, testInput, setTestOutput }) => {
    const [code, setCode] = useState('');
    const codeRef = useRef('');
    const [testIsLoading, setTestLoading] = useState(false);
    const [submitIsLoading, setSubmitLoading] = useState(false);

    const submit = async () => {
        setSubmitLoading(true);
        var outputs = [];
        for (const key of Object.keys(testCases)) {
            const data = {
                language: 'python3',
                script: code,
                stdin: testCases[key].input,
            };
            try {
                const {
                    data: { output },
                } = await server.post('/code', data);
                outputs.push(output.substring(0, output.length - 1));
            } catch (error) {
                console.log(error);
            }
        }
        setSubmitLoading(false);
        console.log(outputs);
        console.log(score(outputs, testCases));
    };

    const test = async () => {
        setTestLoading(true);
        const data = {
            language: 'python3',
            script: code,
            stdin: testInput,
        };
        try {
            const {
                data: { output },
            } = await server.post('/code', data);
            setTestOutput(output.substring(0, output.length - 1));
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
                    onClick={test}
                >
                    Test
                </Button>
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
                    isLoading={submitIsLoading}
                    onClick={submit}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default Editor;
