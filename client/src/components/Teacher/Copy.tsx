import { Box, Button, useClipboard } from '@chakra-ui/react';
import React from 'react';

interface CopyProps {
    classCode: string;
}

const Copy: React.FC<CopyProps> = ({ classCode }) => {
    const { hasCopied, onCopy } = useClipboard(classCode);

    return (
        <Box display="flex">
            <Button size="lg" onClick={onCopy} ml={2} variant="link" colorScheme="purple">
                {hasCopied ? 'Copied' : `Code: ${classCode}`}
            </Button>
        </Box>
    );
};

export default Copy;
