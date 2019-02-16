import React, { Component } from 'react';
import Notification from './Notification';

class Form extends Component {
    state = {
        value: '',
        url: '',
        showNotification: false
    };

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        fetch('http://localhost:8012/url-shortener-backend/public/api/v1/links', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: this.state.value})
        })
        .then(response => response.json())
        .then(responseData => {
            // console.log('responseData', responseData);
            if (! responseData.error) {
                this.setState({ 
                    value: '',
                    showNotification: true,
                    url: responseData.data.message 
                });       
            } else {
                this.setState({ 
                    showNotification: false 
                });  
            }
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });

        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Notification show={this.state.showNotification} url={this.state.url} />

                <form onSubmit={this.handleSubmit}>
                    <input type="url" value={this.state.value} onChange={this.handleChange} placeholder="Paste a link to shorten it" />
                    <input type="submit" value="SHORTEN"/>
                </form>
            </React.Fragment>
        );
    }
}

export default Form;