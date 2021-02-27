import React, { useRef, useState, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-cobalt';
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
            stdin: 'TESTING',
        };
        // try {
        //   const res = await server.post('/code', data);
        //   console.log(res.data);
        // } catch (error) {
        //   console.log(error);
        // }
    };

    return (
<<<<<<< HEAD
        <div>
=======
        <Box>
>>>>>>> ff58a0e33b96713551d8e090469e8f013d396de8
            <AceEditor
                ref={codeRef}
                mode="python"
                theme="cobalt"
                onChange={onChange}
                value={code}
                name="UNIQUE_ID_OF_DIV"
                height="50vh"
                width="60vw"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
            />
<<<<<<< HEAD
            <button onClick={submit}>Submit</button>
        </div>
=======
            <Button onClick={submit}>Submit</Button>
        </Box>
>>>>>>> ff58a0e33b96713551d8e090469e8f013d396de8
    );
}

export default Editor;
