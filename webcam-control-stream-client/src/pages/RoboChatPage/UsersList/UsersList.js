import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import {usersListEvents} from '../../../services/users.service';
import {fieldNames} from '../../SignInPage/SignInForm/SignInForm.constants';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        document.addEventListener(usersListEvents.USERS_LIST_UPDATE, e => {
            setUsers(e.detail)
        })
    }, []);

    return (
        <Card>
            <Typography variant="h5" component="h2">
                Connected spectators
            </Typography>
            <List>
                {users.map(user => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>{user[fieldNames.NAME_FIELD].charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user[fieldNames.NAME_FIELD]}/>
                    </ListItem>)
                )}
            </List>
        </Card>
    );
};

UsersList.propTypes = {};
UsersList.defaultProps = {};

export default UsersList;
