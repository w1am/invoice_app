import React from 'react';
import { graphql } from 'react-apollo';
import decode from 'jwt-decode';
import axios from 'axios';
import Item from './Item';

import InvoiceLayout from '../components/Layouts/InvoiceLayout';

class CreateInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            client: ''
        }
    }
    componentDidMount() {
        const currentUser = decode(localStorage.getItem('token')).user;
        axios.get(`http://localhost:5000/api/${currentUser.id}/clients`).then(response => {
            this.setState({
                clients: response.data.payload
            })
        })
    }
    render() {
        const { clients } = this.state;
        return (
            <InvoiceLayout>
                <h1>Create Invoice</h1>
                <p>
                    <label>Select client</label> <br />
                    <select onChange={(e) => this.setState({ client: e.target.value })}>
                        {
                            !clients ? null : clients.map(client => (
                                <option key={client._id} value={client.name}>{client.name}</option>
                            ))
                        }
                    </select>
                </p>
                <Item />
            </InvoiceLayout>
        )
    }
}

export default CreateInvoice