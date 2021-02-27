import {
    Box,
    PinInputField,
    FormControl,
    FormLabel,
    Input,
    HStack,
    PinInput,
} from '@chakra-ui/react';
import React from 'react';

interface VariableFormProps {
    user: string;

    className: string;
    setClassName: (s: string) => void;

    srn: string;
    setSRN: (s: string) => void;

    code: string;
    setCode: (s: string) => void;
}

const VariableForm: React.FC<VariableFormProps> = ({
    user,
    srn,
    setSRN,
    className,
    setClassName,
    code,
    setCode,
}) => {
    if (user === 'Student') {
        return (
            <Box my="5">
                <FormControl id="SRN" my="2">
                    <FormLabel fontSize="md">SRN</FormLabel>
                    <Input
                        value={srn}
                        onChange={(e) => setSRN(e.target.value)}
                        placeholder="PES12019XXXXX"
                        type="text"
                        borderColor="#ced4da"
                    />
                </FormControl>
                <FormControl id="code" my="2">
                    <FormLabel fontSize="md">Class Code</FormLabel>
                    <HStack>
                        <PinInput onChange={setCode} value={code}>
                            <PinInputField borderColor="#ced4da" />
                            <PinInputField borderColor="#ced4da" />
                            <PinInputField borderColor="#ced4da" />
                            <PinInputField borderColor="#ced4da" />
                            <PinInputField borderColor="#ced4da" />
                        </PinInput>
                    </HStack>
                </FormControl>
            </Box>
        );
    } else if (user === 'Teacher') {
        return (
            <Box my="5">
                <FormControl id="class-name">
                    <FormLabel fontSize="md">Assignment Name</FormLabel>
                    <Input
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Data Structures Lab"
                        type="text"
                        borderColor="#ced4da"
                    />
                </FormControl>
            </Box>
        );
    } else return <></>;
};

export default VariableForm;
