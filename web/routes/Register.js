import React from 'react';
import { graphql } from 'react-apollo';
import { registerMutation } from '../graphql';

import MessageError from '../components/Messages/MessageError';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            err: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        const { companyName, address, phone, email, password } = this.state;
        const response = await this.props.mutate({
            variables: { companyName, address, phone, email, password }
        })
        const { ok, errors } = response.data.register;
        console.log(errors);
        if (ok) {
            this.props.history.push('/welcome')
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
        const { companyName, address, phone, email, password, err } = this.state;
        const errList = [];

        if (err) {
            errList.push(err);
        }
        return (
            <div>
                <form>
                    <input type='text' name="companyName" value={companyName} placeholder='Company Name' onChange={this.onChange} /> <br />
                    <input type='text' name="address" value={address} placeholder='Address' onChange={this.onChange} /> <br />
                    <input type='text' name="phone" value={phone} placeholder='Phone' onChange={this.onChange} /> <br />
                    <input type='email' name="email" value={email} placeholder='Email Address' onChange={this.onChange} /> <br />
                    <input type='password' name="password" value={password} placeholder='Password' onChange={this.onChange} /> <br />
                    <button onClick={this.onSubmit}>Create</button>
                </form>
                {errList.length ? (
                    <MessageError>
                        <i className="fa fa-times-circle"></i>
                        {errList[0]}
                    </MessageError>
                ) : null}
            </div>
        )
    }
}

export default graphql(registerMutation)(Register);