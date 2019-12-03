import React from 'react';

import ItemList from '../components/Items/ItemList'
import ItemListComponent from '../components/Items/ItemListComponent'

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            unitCost: 0,
            quantity: 0,
            amount: 0,
            additionalDetails: '',
            total: 0,
            items: [{}]
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        const { description, unitCost, quantity, additionalDetails, total } = this.state;
        const amount = quantity * unitCost
        let tempTotal = total;
        tempTotal += amount;
        const data = {
            "description": description,
            "unitCost": unitCost,
            "quantity": quantity,
            "amount": amount,
            "additionDetails": additionalDetails
        }
        const joined = this.state.items.concat(data);
        this.setState({ items: joined, total: tempTotal })
        console.log(this.state.items)
        console.log(this.state.total)
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
                    <button onClick={this.onSubmit}>Add Item</button>
                </form>
                <h1>Items - ${total}</h1>
                <ItemList>
                    {
                        items.map(item => (
                            <ItemListComponent key={Math.random(9999)}>{item.description}</ItemListComponent >
                        ))
                    }
                </ItemList>
            </div>
        )
    }
}

export default Item;