import { createStore } from 'easy-peasy';
import { logIn } from './actions';

const initStore = {
    auth: {
        user: '-1',
        details: {},
    },
};

export default createStore({
    auth: {
        ...initStore.auth,
        logIn,
    },
});
