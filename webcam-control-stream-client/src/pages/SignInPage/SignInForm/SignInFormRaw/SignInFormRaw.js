import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Button, CircularProgress } from '@material-ui/core';

import './SignInFormRaw.css';
import TextFieldWrapper from '../../../../common-components/TextFieldWrapper';
import { fieldNames } from '../SignInForm.constants';

const SignInFormRaw = ({
                           handleSubmit,
                           submitting,
                           valid
                       }) => {
    const isSubmitDisabled = submitting || !valid;
    return (
        <form onSubmit={handleSubmit} className="sign-in-form">
            <Field
                id={fieldNames.EMAIL_FIELD}
                name={fieldNames.EMAIL_FIELD}
                type="text"
                component={TextFieldWrapper}
                className="text-field"
                label="Email"
            />
            <Field
                id={fieldNames.NAME_FIELD}
                name={fieldNames.NAME_FIELD}
                type="text"
                component={TextFieldWrapper}
                className="text-field"
                label="Name"
            />
            <div className="sign-in-form_button-wrapper">
                <Button
                    type="submit"
                    disabled={isSubmitDisabled}
                    variant="contained"
                    color="primary"
                    className="login-btn"
                    classes={{
                        disabled: 'login-btn--disabled',
                    }}
                >
                    Sign in
                </Button>
                {submitting && (
                    <CircularProgress
                        size={24}
                        className="sign-in-form_button_progress"
                    />
                )}
            </div>
        </form>
    );
};

SignInFormRaw.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
};

export default SignInFormRaw;

