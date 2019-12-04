import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';

export default class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
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
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>Phone</th>
                            <th>FAX</th>
                            <th>Address</th>
                        </tr>
                        {
                            !clients ? <p>loading</p> : clients.map(client => (
                                <tr key={client._id}>
                                    <th>{client.name}</th>
                                    <th>{client.email}</th>
                                    <th>{client.phone}</th>
                                    <th>{client.fax}</th>
                                    <th>{client.address}</th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/add-client'><button>Add Client</button></Link>
            </div>
        )
    }
}