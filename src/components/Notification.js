import React from 'react';

const Notification = (props) => {
    if (!props.show) {
        return null;
    }

    return (
        <p>All done! Here is your short URL: <a target="_blank" href={props.url}>{props.url}</a></p>
    );
}

export default Notification;