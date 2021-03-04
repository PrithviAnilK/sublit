import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StoreProvider } from 'easy-peasy';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import store from './easy-peasy/store';
import Class from './pages/Class';
import Landing from './pages/Landing';
import Submissions from './pages/Submissions';
import Submitted from './pages/Submitted';
import './styles/app.css';
import history from './utils/history';

const theme = extendTheme({
    colors: {
        custom: {
            100: '#a7c5eb',
            200: '#709fb0',
            300: '#4a47a3',
            400: '#413c69',
        },
    },
});

const App = () => {
    return (
        <StoreProvider store={store}>
            <ChakraProvider theme={theme}>
                <Router history={history}>
                    <Route path="/" exact component={Landing} />
                    <Route path="/class/" component={Class} />
                    <Route path="/submissions/" component={Submissions} />
                    <Route path="/submitted" component={Submitted} />
                </Router>
            </ChakraProvider>
        </StoreProvider>
    );
};

export default App;
