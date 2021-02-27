import React, { useRef, useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import server from '../../utils/server';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Button, Box } from '@chakra-ui/react';

function Editor({ testCases }) {
    const [code, setCode] = useState('');
    const codeRef = useRef('');

    const onChange = (newValue) => {
        setCode(newValue);
    };
    const submit = async () => {
        // setCode(codeRef.current.value);
        var outputs = [];
        console.log(code);
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
    };

    return (
        <Box background="white">
            <AceEditor
                ref={codeRef}
                mode="python"
                theme="github"
                onChange={onChange}
                value={code}
                name="UNIQUE_ID_OF_DIV"
                height="55vh"
                width="58vw"
                fontSize={18}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
            />
            <Button onClick={submit}>Submit</Button>
        </Box>
    );
}

export default Editor;
