import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import Routes from './routes';
import './public/index.css'

import Nav from './containers/Nav';

import AppLayout from './components/Layouts/AppLayout';

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Nav />
                <AppLayout>
                    <Routes />
                </AppLayout>
            </ApolloProvider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));