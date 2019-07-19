import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import commandsService from '../../services/commands.service';

const MAX_COMMAND_LENGTH = 24;

const CommandInput = (props) => {
    const [command, setCommand] = useState("");

    const handleCommandInput = (e) => {
        const text = e.target.value.substring(0, MAX_COMMAND_LENGTH);
        setCommand(text);
    };

    const handleKeyPress = e => {
        if (e.keyCode === 13) {
            commandsService.send(command);
            setCommand("");
        }
    };

    return (
        <Card>
            <TextField
                label={`Command line, max ${MAX_COMMAND_LENGTH} symbols`}
                style={{margin: 8}}
                placeholder="Type text here, press Enter to send"
                fullWidth
                margin="none"
                variant="filled"
                InputLabelProps={{
                    shrink: true,
                }}
                value={command}
                onChange={handleCommandInput}
                onKeyDown={handleKeyPress}
            />
        </Card>
    );
};

CommandInput.propTypes = {};
CommandInput.defaultProps = {};

export default CommandInput;
