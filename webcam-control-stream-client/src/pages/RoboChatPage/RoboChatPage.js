import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './RoboChatPage.css';
import RoboVideo from './RoboVideo/RoboVideo';
import UsersList from './UsersList/UsersList';
import CommandInput from './CommandInput';
import userConnectionService from '../../services/user-connection.service';

const RoboChatPage = () => {
    useEffect(() => {
        userConnectionService.signIn();
    }, []);

    return (<div className="robo-chat-page">
        <RoboVideo />
        <UsersList />
        <CommandInput />
    </div>)
};

export default RoboChatPage;
