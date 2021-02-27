import { useStoreState } from 'easy-peasy';
import React from 'react';

interface ClassProps {}
const Class: React.FC<ClassProps> = ({}) => {
    const { user, details } = useStoreState(
        (state: { auth: any }) => state.auth
    );

    return <>{user}</>;
};

export default Class;
