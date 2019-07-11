import React from 'react';
import PropTypes from 'prop-types';

import './RoboChatPage.css';
import RoboVideo from './RoboVideo/RoboVideo';

const RoboChatPage = () => {
    return (<div className="robo-chat-page">
        <RoboVideo />
        <section className="users-list"></section>
        <section className="command-input"></section>
    </div>)
};

export default RoboChatPage;
