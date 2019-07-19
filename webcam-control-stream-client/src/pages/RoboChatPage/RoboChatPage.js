import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './RoboChatPage.css';
import RoboVideo from './RoboVideo/RoboVideo';
import UsersList from './UsersList/UsersList';
import usersService from '../../services/users.service';

const RoboChatPage = () => {
    useEffect(() => {
        usersService.signIn();
    }, []);

    return (<div className="robo-chat-page">
        <RoboVideo />
        <UsersList />
        <section className="command-input"></section>
    </div>)
};

export default RoboChatPage;
