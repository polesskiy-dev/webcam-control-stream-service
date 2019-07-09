import * as Yup from 'yup/lib';

import { fieldNames } from './SignInForm.constants';

const signInFormValidationSchema = Yup.object({
    [fieldNames.NAME_FIELD]: Yup.string()
        .required('Name is required'),
    [fieldNames.EMAIL_FIELD]: Yup.string()
        .email('Should be valid email')
        .required('Email is required'),
});

export default signInFormValidationSchema;
