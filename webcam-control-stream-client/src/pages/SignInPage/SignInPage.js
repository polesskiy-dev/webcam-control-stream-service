import React from 'react';
import PropTypes from 'prop-types';

import './SignInPage.css';
import SignInForm from './SignInForm/SignInForm';

const SignInPage = () => {
    return (<div className="sing-in-page">
        <section className="sing-in-page_form-section">
            <SignInForm />
        </section>
    </div>)
};

export default SignInPage
