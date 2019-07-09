import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const TextFieldWrapper = ({
                              input: { name, onChange, value, type, ...restInput },
                              meta,
                              label,
                              ...rest
                          }) => {
    const showHelperText = () =>
        !meta.active && meta.touched ? meta.error : undefined;

    return (
        <TextField
            error={meta.error && !meta.active && meta.touched}
            name={name}
            label={showHelperText() || label}
            inputProps={restInput}
            onChange={onChange}
            value={value}
            {...rest}
        />
    );
};

TextFieldWrapper.propTypes = {
    input: PropTypes.instanceOf(Object).isRequired, // TODO get final-form definition
    meta: PropTypes.instanceOf(Object).isRequired, // TODO get final-form definition
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default TextFieldWrapper;
