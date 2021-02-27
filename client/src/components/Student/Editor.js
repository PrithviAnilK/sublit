import React, { useRef, useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import server from '../../utils/server';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Button, Box } from '@chakra-ui/react';

function Editor() {
    const [code, setCode] = useState('');
    const codeRef = useRef('');

    const onChange = (newValue) => {
        setCode(newValue);
    };
    const submit = async () => {
        // setCode(codeRef.current.value);
        console.log(code);
        const data = {
            language: 'python3',
            script: code,
            // stdin: '3↵1 2↵100 200↵10 40',
            stdin: '3 4',
        };
        try {
            const res = await server.post('/code', data);
            console.log(res.data);
            const string = res.data.output;
            console.log(string.charCodeAt(5));
        } catch (error) {
            console.log(error);
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
