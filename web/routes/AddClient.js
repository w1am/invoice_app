import React from 'react';
import { graphql } from 'react-apollo';
import { addClientMutation } from '../graphql';

class AddClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            fax: '',
            address: '',
            phone: '',
            err: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        const { email, name, phone, fax, address } = this.state;
        const response = await this.props.mutate({
            variables: { name, email, phone, fax, address }
        })
        const { ok, errors } = response.data.addClient
        if (ok) {
            return this.props.history.push('/clients') 
        } else {
            this.setState({
                err: errors.message
            })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { email, name, phone, address, fax, err } = this.state;
        const errList = [];

        if (err) {
            errList.push(err);
        }
        return (
            <div>
                <form>
                    <input type='text' name="name" value={name} placeholder='Name' onChange={this.onChange} /> <br />
                    <input type='email' name="email" value={email} placeholder='Email' onChange={this.onChange} /> <br />
                    <input type='text' name="phone" value={phone} placeholder='Phone' onChange={this.onChange} /> <br />
                    <input type='text' name="fax" value={fax} placeholder='Fax' onChange={this.onChange} /> <br />
                    <input type='text' name="address" value={address} placeholder='Address' onChange={this.onChange} /> <br />
                    <button onClick={this.onSubmit}>Add</button>
                </form>
                {errList.length ? (
                    <p>{errList[0]}</p>
                ) : null}
            </div>
        )
    }
}

export default graphql(addClientMutation)(AddClient);