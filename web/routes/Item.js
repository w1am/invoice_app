import React from 'react';

import ItemList from '../components/Items/ItemList'
import ItemListComponent from '../components/Items/ItemListComponent'
import StrikeThrough from '../components/Texts/StrikeThrough'
import MessageInfo from '../components/Messages/MessageInfo'
import ItemTitle from '../components/Texts/ItemTitle';
import { Link } from 'react-router-dom';

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
            items: [{}]
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getDiscountOption = this.getDiscountOption.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        const { description, unitCost, quantity, additionalDetails, total, priceAfterDiscount, discountValue } = this.state;
        const { discount, discountOption } = this.props;
        const amount = quantity * unitCost
        let discountedPrice = priceAfterDiscount;
        if (discountOption == 2) {
            discountedPrice = amount - ((discountValue * amount) * 0.01);
        } else if (discountOption == 3) {
            discountedPrice = amount - ((discount * amount) * 0.01);
        } else if (discountOption == 4) {
            discountedPrice = amount - discountValue
        } else {
            if (discountedPrice == 0) {
                discountedPrice = amount
            }
        }
        let tempTotal = total;
        let tempSubTotal = total;
        tempSubTotal += amount
        if (discountedPrice == 0) {
            tempTotal += tempSubTotal;
        } else {
            tempTotal += discountedPrice;
        }

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
            "amount": amount,
            "additionDetails": additionalDetails,
            "priceAfterDiscount": discountedPrice
        }

        this.setState({
            items: [...this.state.items, data],
            total: tempTotal
        })
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
        const { description, unitCost, quantity, additionalDetails, total, items } = this.state;
        return (
            <div>
                <form>
                    <input type='text' name="description" value={description} placeholder='Description' onChange={this.onChange} />
                    <input type='number' name="unitCost" value={unitCost} placeholder='Unit cost' onChange={this.onChange} /> <br />
                    <input type='number' name="quantity" value={quantity} placeholder='Quantity' onChange={this.onChange} />
                    <input type='text' name="additionalDetails" value={additionalDetails} placeholder='Addition Details' onChange={this.onChange} /> <br />
                    {this.getDiscountOption()}
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