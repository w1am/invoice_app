import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import Routes from './routes';
import './public/index.css'

import Nav from './containers/Nav';

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Nav />
                <Routes />
            </ApolloProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));