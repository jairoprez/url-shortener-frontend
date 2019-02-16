import React from 'react';

const LinkList = (props) => {
    const links = props.links;
    const listItems = links.map((link) =>
        <li key={link.id.toString()}>
            {link.url}
        </li>
    );

    return (
        <React.Fragment>
            <h2>Top 100 most frequently accessed URLs</h2>

            <ol>{listItems}</ol> 
        </React.Fragment>
    );
}

export default LinkList;