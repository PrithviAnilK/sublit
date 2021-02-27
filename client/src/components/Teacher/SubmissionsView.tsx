import {
    Box,
    Heading,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

interface SubmissionsViewProps {}

interface ISubmission {
    submitted: boolean;
    name: string;
    srn: string;
    score: number;
    code: string;
}

const SubmissionsView: React.FC<SubmissionsViewProps> = ({}) => {
    const [submissions, setSubmissions] = useState<ISubmission[]>([
        {
            submitted: true,
            name: 'Prithvi Anil',
            srn: 'PES1201900054',
            score: 10,
            code: '',
        },
    ]);
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
            <Table variant="striped" colorScheme="purple" p="5">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th display={{ lg: 'table-cell', base: 'none' }}>SRN</Th>
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
