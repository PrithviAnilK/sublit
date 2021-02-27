import React from 'react';
import { Grid, Box, GridItem } from '@chakra-ui/react';
import Editor from '../components/Student/Editor';
import Questions from '../components/Student/Questions';

function Student() {
    return (
        <div>
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
        </div>
    );
}

export default Student;
