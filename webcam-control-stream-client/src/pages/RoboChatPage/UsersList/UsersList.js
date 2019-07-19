import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';

import {usersListEvents} from '../../../services/user-connection.service';
import {fieldNames} from '../../SignInPage/SignInForm/SignInForm.constants';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        document.addEventListener(usersListEvents.USERS_LIST_UPDATE, e => {
            setUsers(e.detail || [])
        })
    }, []);

    return (
        <Card>
            <CardContent>
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
            </CardContent>
        </Card>
    );
};

UsersList.propTypes = {};
UsersList.defaultProps = {};

export default UsersList;
