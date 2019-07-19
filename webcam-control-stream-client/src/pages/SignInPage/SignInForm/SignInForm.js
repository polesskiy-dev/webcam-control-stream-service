import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { Form } from 'react-final-form';

import './SignInForm.css';
import SignInFormRaw from './SignInFormRaw/SignInFormRaw';
import signInFormValidationSchema from './SignInForm.validation-schema';
import history from '../../../helpers/history';
import { saveCredentials } from '../../../helpers/auth.helper';
import { ROBO_CHAT_URL } from '../../../constants/url.constants';

const validate = async values => {
    try {
        await signInFormValidationSchema.validate(values);
    } catch ({ path, message }) {
        return { [path]: message };
    }

    return null;
};


const SignInForm = () => {
    const handleSubmit = (credentials) => {
        saveCredentials(credentials);
        window.location.href = ROBO_CHAT_URL;
    };

    return (
        <Card className="sing-in-form-card">
            <Form
                component={SignInFormRaw}
                {...{ onSubmit: handleSubmit, validate }}
            />
        </Card>)
};

export default SignInForm
