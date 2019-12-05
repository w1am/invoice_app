import React from 'react';

import ItemList from '../components/Items/ItemList'
import ItemListComponent from '../components/Items/ItemListComponent'
import StrikeThrough from '../components/Texts/StrikeThrough'
import MessageInfo from '../components/Messages/MessageInfo'
import ItemTitle from '../components/Texts/ItemTitle';
import { Link } from 'react-router-dom';

import MessageError from '../components/Messages/MessageError';

class Item extends React.Component {
    componentDidMount() {
        this.setState({ items: this.state.items.slice(1) })
    }
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            unitCost: 0,
            quantity: 0,
            amount: 0,
            additionalDetails: '',
            total: 0,
            discountValue: 0,
            priceAfterDiscount: 0,
            items: [{}],
            response: {
                ok: true,
                message: ""
            }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getDiscountOption = this.getDiscountOption.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        const { description, unitCost, amount, quantity, additionalDetails, total, priceAfterDiscount, discountValue } = this.state;
        const { discount, discountOption } = this.props;
        let tempSubTotal = amount;
        console.log('tempSubTotal', tempSubTotal)
        let tempAmount = amount;
        console.log('tempAmount', tempAmount)
        tempAmount = quantity * unitCost;
        console.log('tempAmount q * unitcos', tempAmount)
        tempSubTotal += tempAmount;
        console.log('tempSubTotal', tempSubTotal);
        let discountedPrice = priceAfterDiscount;
        if (discountOption == 2) {
            discountedPrice = tempAmount - ((discountValue * tempAmount) * 0.01);
        } else if (discountOption == 3) {
            discountedPrice = tempAmount - ((discount * tempAmount) * 0.01);
        } else if (discountOption == 4) {
            discountedPrice = tempAmount - discountValue
        } else {
            if (discountedPrice == 0) {
                discountedPrice = tempAmount
            }
        }

        console.log(discountedPrice)

        let tempTotal = total;
        tempTotal += discountedPrice;

        const storedInfo = {
            "subTotal": tempSubTotal,
            "total": tempTotal,
            "discount": discount
        }

        localStorage.setItem('money', JSON.stringify(storedInfo));

        const data = {
            "description": description,
            "unitCost": unitCost,
            "quantity": quantity,
            "amount": tempAmount,
            "additionDetails": additionalDetails,
            "priceAfterDiscount": discountedPrice
        }

        let errors = this.checkErrors();
        if (errors) {
            this.setState({
                response: {
                    ok: false,
                    message: "Make sure you select a client, add a description, a unit cost and quantity"
                }
            })
        } else {
            this.setState({
                items: [...this.state.items, data],
                total: tempTotal,
                amount: tempAmount,
                response: {
                    ok: true,
                    message: ''
                }
            })
        }
    }

    checkErrors() {
        const { description, unitCost, quantity } = this.state;
        const client = localStorage.getItem('client');
        if (client == "Not specified" || !client || description == '' || unitCost == '' || quantity == '') {
            return true
        }
    }

    getDiscountOption() {
        const { discountValue, discountOption } = this.props;
        if (discountOption == 2) {
            return (
                <input type='number' name="discountValue" value={discountValue} placeholder='Discount %' onChange={this.onChange} />
            )
        }
    }

    saveInfo() {
        const { items } = this.state;
        localStorage.setItem("items", JSON.stringify(items));
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { description, unitCost, quantity, additionalDetails, total, items, response } = this.state;
        console.log(response)
        return (
            <div>
                <form>
                    <label>Description</label>
                    <input type='text' name="description" placeholder="eg. Service Fee" value={description} onChange={this.onChange} />
                    <label>Unit Cost</label>
                    <input type='number' name="unitCost" value={unitCost} onChange={this.onChange} /> <br />
                    <label>Quantity</label>
                    <input type='number' name="quantity" value={quantity} onChange={this.onChange} />
                    <label>Additional Details</label>
                    <input type='text' name="additionalDetails" value={additionalDetails} onChange={this.onChange} /> <br />
                    {this.getDiscountOption()}
                    {
                        response.ok ? null : (
                            <MessageError id="msg-error">
                                <i className="fa fa-times-circle"></i>
                                {response.message}
                            </MessageError>
                        )
                    }
                    <button onClick={this.onSubmit}>Add Item</button>
                </form>
                <h1>Items - ${total}</h1>
                <ItemList>
                    {
                        items.map(item => (
                            <ItemListComponent key={Math.random(9999)}>
                                <ItemTitle>{item.description}</ItemTitle>
                                <StrikeThrough>${item.amount}</StrikeThrough>
                                ${item.priceAfterDiscount}
                            </ItemListComponent >
                        ))
                    }
                </ItemList>
                <MessageInfo>
                    <i className="fa fa-info-circle"></i>
                    Items will automatically be added to your favourites
                </MessageInfo>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/invoice'><button onClick={this.saveInfo}>Generate Invoice</button></Link>
            </div>
        )
    }
}

export default Item;