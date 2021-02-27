import { Grid, Box, GridItem } from '@chakra-ui/react';
import Editor from './Editor';
import Questions from './Questions';
import { io, Socket } from 'socket.io-client';

import React, { useEffect } from 'react';
import { useStoreState } from 'easy-peasy';

let socket: Socket;
const Student = () => {
    const { details } = useStoreState((store: any) => store.auth);
    useEffect(() => {
        const ENDPOINT = 'http://localhost:5000/';
        socket = io(ENDPOINT);
        socket.emit('addStudent', details);
    }, []);

    return (
        <Box>
            <Box padding="10px">
                <Grid
                    h="100vh"
                    templateRows="repeat(10, 1fr)"
                    templateColumns="repeat(10, 1fr)"
                    gap={4}
                >
                    <GridItem rowSpan={10} colSpan={4}>
                        <Questions />
                    </GridItem>
                    <GridItem colSpan={6} rowSpan={6}>
                        <Editor />
                    </GridItem>
                    <GridItem colSpan={6} rowSpan={4} bg="tomato" />
                </Grid>
            </Box>
        </Box>
    );
};

export default Student;
