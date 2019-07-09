import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { SIGN_IN_URL } from '../constants/url.constants';

// TODO check auth from localstorage
const ProtectedRoute = ({ isAuthenticated, ...restProps }) =>
    isAuthenticated ? (
        <Route {...restProps} />
    ) : (
        <Redirect push to={SIGN_IN_URL} />
    );

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
