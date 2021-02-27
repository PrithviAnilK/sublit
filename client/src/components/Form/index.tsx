import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import VariableForm from './VariableForm';
import history from '../../utils/history';
import { useStoreActions } from 'easy-peasy';

const makeID = (length: number) => {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

const Form = () => {
    const [user, setUser] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [srn, setSRN] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [className, setClassName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const buttonText = user === 'Teacher' ? 'Create Room' : 'Join Room';
    const { logIn } = useStoreActions((actions: any) => actions.auth);

    const onSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setIsLoading(true);

        if (user === 'Teacher') {
            const id = makeID(5);
            const userData = {
                user,
                details: {
                    classCode: id,
                    className,
                    students: [],
                },
            };
            logIn(userData);
            history.push(`/class/${id}/`);
        } else {
            const userData = {
                user,
                details: {
                    name,
                    srn,
                    submitted: false,
                    code: '',
                    score: 0,
                    classCode: code,
                },
            };
            logIn(userData);
            history.push(`/class/${code}/`);
        }
    };

    return (
        <Box
            borderRadius="lg"
            p="10"
            h={{ lg: '60%', base: '60%' }}
            w={{ lg: '60%', base: '95%' }}
            mx="auto"
            bg="#ffffff"
        >
            <Heading textAlign="center">Login</Heading>
            <Box my="5">
                <FormControl id="name">
                    <FormLabel fontSize="lg">Name</FormLabel>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ritesh Sapata"
                        type="text"
                        borderColor="#ced4da"
                    />
                </FormControl>
                <FormControl as="fieldset" my="5">
                    <FormLabel fontSize="lg" as="legend">
                        You are a{' '}
                    </FormLabel>
                    <RadioGroup
                        onChange={(val) => {
                            // @ts-ignore
                            setUser(val);
                            setDisabled(false);
                        }}
                    >
                        <HStack align="center" spacing="24px">
                            <Radio
                                value="Student"
                                borderColor="#ced4da"
                                _checked={{
                                    bg: '#8e2de2',
                                    bgGradient: 'linear(to-r,#8e2de2, #4a00e0)',
                                }}
                            >
                                Student
                            </Radio>
                            <Radio
                                borderColor="#ced4da"
                                value="Teacher"
                                _checked={{
                                    bg: '#8e2de2',
                                    bgGradient: 'linear(to-r,#8e2de2, #4a00e0)',
                                }}
                            >
                                Teacher
                            </Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
                <VariableForm
                    user={user}
                    srn={srn}
                    setSRN={setSRN}
                    setClassName={setClassName}
                    className={className}
                    code={code}
                    setCode={setCode}
                />
                <Button
                    color="#ffffff"
                    bg="#8e2de2"
                    bgGradient="linear(to-r,#8e2de2, #4a00e0)"
                    _hover={{
                        bg: '#8e2de2',
                        bgGradient: 'linear(to-r,#8e2de2, #4a00e0)',
                    }}
                    isLoading={isLoading}
                    isDisabled={disabled}
                    onClick={onSubmit}
                >
                    {buttonText}
                </Button>
            </Box>
        </Box>
    );
};

export default Form;
