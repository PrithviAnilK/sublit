import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Textarea,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    addTestCase: (input: string, output: string) => void;
}

const TestCaseModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    addTestCase,
}) => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a test case</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="testcase-input">
                            <FormLabel fontSize="lg">Testcase Input</FormLabel>
                            <Textarea
                                borderColor="#ced4da"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="output">
                            <FormLabel fontSize="lg">Expected Output</FormLabel>
                            <Textarea
                                borderColor="#ced4da"
                                value={output}
                                onChange={(e) => setOutput(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="#ffffff"
                            bg="#8e2de2"
                            bgGradient="linear(to-r,#8e2de2, #4a00e0)"
                            _hover={{
                                bg: '#8e2de2',
                                bgGradient: 'linear(to-r,#8e2de2, #4a00e0)',
                            }}
                            mr={3}
                            onClick={() => {
                                addTestCase(input, output);
                                setInput('');
                                setOutput('');
                            }}
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TestCaseModal;
