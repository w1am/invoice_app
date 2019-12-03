import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import ClientButton from '../components/Buttons/ClientButton';
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
                <Link to='/add-client'><ClientButton>Add Client</ClientButton></Link>
                <ul>
                    {
                        !clients ? <p>Loading...</p> : clients.map(client => (
                            <div key={client._id}>
                                <li>{client.name}</li>
                                <ul>
                                    <li>{client.email}</li>
                                    <li>{client.phone}</li>
                                    <li>{client.fax}</li>
                                    <li>{client.address}</li>
                                </ul>
                            </div>
                        ))
                    }
                </ul>
            </div>
        )
    }
}