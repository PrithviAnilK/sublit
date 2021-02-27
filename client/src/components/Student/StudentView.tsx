import React from 'react';
import { Grid, Box, GridItem } from '@chakra-ui/react';
import Editor from './Editor';
import Questions from './Questions';

const Student = () => {
    return (
        <Box className='amin-gradient'>
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
                    <GridItem colSpan={5} rowSpan={3} bg="tomato" />
                </Grid>
            </Box>
        </Box>
    );
};

export default Student;
