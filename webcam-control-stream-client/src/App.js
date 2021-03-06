import React from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';

import './App.css';
import history from './helpers/history';
import ProtectedRoute from './common-components/ProtectedRoute';
import SignInPage from './pages/SignInPage/SignInPage';
import RoboChatPage from './pages/RoboChatPage/RoboChatPage';
import {ROBO_CHAT_URL, SIGN_IN_URL} from './constants/url.constants';
import { hasCredentials } from './helpers/auth.helper';

const App = () => (
    <Router history={history}>
        <Switch>
            <Route path={SIGN_IN_URL} component={SignInPage} />
            <ProtectedRoute
                isAuthenticated={hasCredentials()}
                path={ROBO_CHAT_URL}
                component={RoboChatPage}
            />
            <Route
                path="/"
                component={() => <Redirect to={ROBO_CHAT_URL} />}
            />
        </Switch>
    </Router>
);

export default App;
