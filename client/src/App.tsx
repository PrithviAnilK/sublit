import { ChakraProvider, extendTheme, Switch } from '@chakra-ui/react';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import Class from './pages/Class';
import Landing from './pages/Landing';
import './styles/app.css';
import { StoreProvider } from 'easy-peasy';
import store from './easy-peasy/store';
import history from './utils/history';
import Submissions from './pages/Submissions';

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
                </Router>
            </ChakraProvider>
        </StoreProvider>
    );
};

export default App;
