import React from 'react';
import decode from 'jwt-decode';
import axios from 'axios';

import Item from './Item';

import InvoiceLayout from '../components/Layouts/InvoiceLayout';
import { Link } from 'react-router-dom';

class CreateInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            client: '',
            discountOption: 1,
            discountValue: 0
        }
        this.getDiscountOption = this.getDiscountOption.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        localStorage.removeItem('client')
        localStorage.removeItem('items')
        localStorage.removeItem('money')
        const currentUser = decode(localStorage.getItem('token')).user;
        axios.get(`http://localhost:5000/api/${currentUser.id}/clients`).then(response => {
            this.setState({
                clients: response.data.payload
            })
        })
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    getDiscountOption() {
        const { discountOption, discountValue } = this.state;
        if (discountOption == 3 || discountOption == 4) {
            return (
                <input value={discountValue} onChange={this.onChange} type='number' name="discountValue" placeholder='Discount %' />
            )
        } else if (discountOption == 2) {
            return true
        }
    }
    render() {
        const { clients, discountValue, discountOption } = this.state;
        return (
            <div>
                <InvoiceLayout>
                    <h1>Create Invoice</h1>
                    <label>Select client <Link style={{ color: "#0062CC" }} to='/clients'>(Add client)</Link></label> <br />
                    <select onChange={(e) => localStorage.setItem('client', e.target.value)}>
                        <option value="Not specified">Not Specified</option>
                        {
                            !clients ? null : clients.map(client => (
                                <option key={client._id} value={client.name}>{client.name}</option>
                            ))
                        }
                    </select>
                    <label>Discount</label> <br />
                    <select onChange={(e) => this.setState({ discountOption: e.target.value })}>
                        <option value="1">No discount</option>
                        <option value="2">Discount per item</option>
                        <option value="3">Percentage</option>
                        <option value="4">Flat amount</option>
                    </select>
                    {this.getDiscountOption()}
                    <Item discount={discountValue} discountOption={discountOption} />
                </InvoiceLayout>
            </div>
        )
    }
}

export default CreateInvoice