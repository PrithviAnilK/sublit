import { createStore } from 'easy-peasy';
import { addAssignment, logIn } from './actions';

const initStore = {
    auth: {
        user: '-1',
        details: {},
    },
    assignment: {
        details: {}
    }
};

export default createStore({
    auth: {
        ...initStore.auth,
        logIn,
    },
    assignment: {
        ...initStore.assignment,
        addAssignment
    }
});
