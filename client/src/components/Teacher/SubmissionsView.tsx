import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Heading,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASEURL } from '../../utils/config';
import Copy from './Copy';

interface SubmissionsViewProps {}

interface ISubmission {
    submitted: boolean;
    name: string;
    srn: string;
    score: number;
    code: string;
}

let socket: Socket;
const SubmissionsView: React.FC<SubmissionsViewProps> = ({}) => {
    const {
        details: { classCode },
    } = useStoreState((store: any) => store.auth);
    const [submissions, setSubmissions] = useState<ISubmission[]>([]);

    useEffect(() => {
        socket = io(BASEURL);
        socket.emit('join', { user: 'Teacher', classCode });
    }, [BASEURL]);

    useEffect(() => {
        socket.on('updateSubmissions', (students: ISubmission[]) => {
            setSubmissions(students);
        });
    }, []);

    useEffect(() => {
        socket.on('onSubmit', (students: ISubmission[]) => {
            setSubmissions(students);
        });
    }, []);

    return (
        <Box
            borderRadius="lg"
            p="10"
            h={{ lg: '60%', base: '60%' }}
            w={{ lg: '60%', base: '95%' }}
            mx="auto"
            my="5"
            bg="#ffffff"
        >
            <Heading>Submissions</Heading>
            <Box my="5">
                <Copy classCode={classCode} />
            </Box>
            <Table variant="striped" colorScheme="purple" p="5">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th display={{ lg: 'table-cell', base: 'none' }}>
                            SRN
                        </Th>
                        <Th>Score</Th>
                        <Th display={{ lg: 'table-cell', base: 'none' }}>
                            Submitted
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {submissions.map(({ name, srn, score, submitted }, key) => (
                        <Tr key={key}>
                            <Td>{name}</Td>
                            <Td
                                display={{
                                    lg: 'table-cell',
                                    base: 'none',
                                }}
                            >
                                {srn}
                            </Td>
                            <Td>{score}</Td>
                            <Td
                                display={{
                                    lg: 'table-cell',
                                    base: 'none',
                                }}
                            >
                                {submitted ? (
                                    <CheckCircleIcon color="green" />
                                ) : (
                                    <CloseIcon color="red" />
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default SubmissionsView;
