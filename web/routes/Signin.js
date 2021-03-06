import React from 'react';
import { graphql } from 'react-apollo';
import { signinMutation } from '../graphql';

import MessageError from '../components/Messages/MessageError';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            err: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const response = await this.props.mutate({
            variables: { email, password }
        })
        const { ok, errors, token, refreshToken } = response.data.signin;
        if (ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken)
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
        const { email, password, err } = this.state;
        const errList = [];

        if (err) {
            errList.push(err);
        }
        return (
            <div>
                <form>
                    <input type='email' name="email" value={email} placeholder='Email Address' onChange={this.onChange} /> <br />
                    <input type='password' name="password" value={password} placeholder='Password' onChange={this.onChange} /> <br />
                    <button onClick={this.onSubmit}>Sign in</button>
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

export default graphql(signinMutation)(Signin);