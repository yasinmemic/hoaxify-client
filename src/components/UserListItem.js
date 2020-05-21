import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';

const UserListItem = (props) => {

    const { user } = props;
    const { username, displayName, image } = user;


    return (
        <Link to={`/users/${username}`} className="list-group-item list-group-item-action">
            <ProfilePicture width="32" height="32" alt={`${username} profile`} image={image} />
            <span className="pl-5"> {displayName} @{username}</span>
        </Link>
    );
};

export default UserListItem;