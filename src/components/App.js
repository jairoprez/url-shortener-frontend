import React, { Component } from 'react';
import Form from './Form';
import LinkList from './LinkList';

class App extends Component {
    state = {
        links: []
    };

    componentDidMount() {
        fetch('http://localhost:8012/url-shortener-backend/public/api/v1/links')
        .then(response => response.json())
        .then(responseData => {
            this.setState({ links: responseData.data });
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });
    }

    render() {
        return (
            <div className="container">
                <h1 className="title">Shorten a URL.</h1>

                <Form />

                <LinkList links={this.state.links} />
            </div>
        );
    }
}

export default App;