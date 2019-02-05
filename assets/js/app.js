const apiUrl = 'http://localhost:8012/url-shortener-backend/public/';

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

const Notification = (props) => {
    if (!props.show) {
        return null;
    }

    return (
        <p>All done! Here is your short URL: <a target="_blank" href={props.url}>{props.url}</a></p>
    );
}

class Form extends React.Component {
    state = {
        value: '',
        url: '',
        showNotification: false
    };

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        fetch(apiUrl + 'api/v1/links', {
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

class App extends React.Component {
    state = {
        links: []
    };

    componentDidMount() {
        fetch(apiUrl + 'api/v1/links')
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);