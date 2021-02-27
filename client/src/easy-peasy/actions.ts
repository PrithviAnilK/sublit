import { action } from 'easy-peasy';

export const logIn = action((state: any, { user, details }: any) => {
    state.user = user;
    state.details = details;
});

export const addAssignment = action((state: any, assignment: any) => {
    state.assignment = assignment;
});
