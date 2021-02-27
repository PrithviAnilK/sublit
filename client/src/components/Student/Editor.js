import React, { useRef, useState, useEffect } from 'react';
import AceEditor from 'react-ace';
// import text from './competitions.txt'; // Relative path to your File

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/ext-language_tools';

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
        <div>
            <div>
                {/* <p>Given an array of integers, Find the subarray with maximum sum!!!</p>

        <p>Max Points : {maxp}</p>
        <p>Posted on : Sun Jan 24 2021 01:00:00 GMT+0530</p>
        <p>Started : Sun Jan 24 2021 04:53:20 GMT+0530</p> */}
            </div>
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
            <button onClick={submit}>Submit</button>
            {/* <div>Gained Points:{scored}</div> */}
        </div>
    );
}

export default Editor;
