import React from 'react';
import decode from 'jwt-decode';
import Moment from 'react-moment';

import Invoice from '../components/Invoice/Invoice';
import InvoiceInfo from '../components/Invoice/InvoiceInfo';
import InvoiceInfoList from '../components/Invoice/InvoiceInfoList';
import InvoiceHead from '../components/Invoice/InvoiceHead';
import InvoiceHeadList from '../components/Invoice/InvoiceHeadList';
import InvoiceHeadAppTitle from '../components/Invoice/InvoiceHeadAppTitle';
import Money from '../components/Money/Money';
import MoneyList from '../components/Money/MoneyList';

class InvoicePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            phone: '',
            email: '',
            companyName: '',
            client: '',
        }
    }

    printInvoice() {
        const printContents = document.getElementById("print-section").innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload()
    }

    componentDidMount() {
        const currentUser = decode(localStorage.getItem('token')).user;
        const client = localStorage.getItem('client');
        this.setState({
            address: currentUser.address,
            phone: currentUser.phone,
            email: currentUser.email,
            companyName: currentUser.companyName,
            client: client,
        })
    }
    render() {
        const { email, companyName, address, phone, client } = this.state;
        const date = new Date();
        const items = JSON.parse(localStorage.getItem('items'));
        const money = JSON.parse(localStorage.getItem('money'));
        return (
            <div>
                <Invoice id="print-section">
                    <InvoiceInfo>
                        <InvoiceInfoList>{address}</InvoiceInfoList>
                        <br />
                        <InvoiceInfoList>{email}</InvoiceInfoList>
                        <InvoiceInfoList>{phone}</InvoiceInfoList>
                    </InvoiceInfo>
                    <InvoiceHead>
                        <InvoiceHeadList>{companyName}</InvoiceHeadList>
                        <InvoiceHeadAppTitle>INVOICE</InvoiceHeadAppTitle>
                    </InvoiceHead>
                    <p>Bill to:</p>
                    <p>{client}</p>
                    <Moment format="DD/MM/YYYY">
                        {date}
                    </Moment>
                    <table>
                        <tbody>
                            <tr>
                                <th>DESCRIPTION</th>
                                <th>QTY</th>
                                <th>RATE</th>
                                <th>AMOUNT</th>
                            </tr>
                            {
                                items.map(item => (
                                    <tr key={Math.random(999)}>
                                        <th>{item.description}</th>
                                        <th>{item.quantity}</th>
                                        <th>${item.unitCost}</th>
                                        <th>${item.amount}</th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Money>
                        <MoneyList>Subtotal ${money.subTotal}</MoneyList>
                        <MoneyList>Discount ({money.discount}%) ${money.subTotal - money.total}</MoneyList>
                        <MoneyList>Total ${money.total}</MoneyList>
                    </Money>
                </Invoice>
                <button onClick={this.printInvoice}>Print Invoice</button>
            </div>
        )
    }
}

export default InvoicePage;