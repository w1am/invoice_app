import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import CreateInvoice from './CreateInvoice';
import Register from './Register';
import Signin from './Signin';
import AddClient from './AddClient';
import Welcome from './Welcome';
import Signout from './Signout';
import Goodbye from './Goodbye';
import Clients from './Clients';

const isAuthenticated = () => {
	const token = localStorage.getItem('token');
	const refreshToken = localStorage.getItem('refreshToken');
	try {
		if (token) {
			decode(token, { header: true });
		}
		if (refreshToken) {
			decode(refreshToken, { header: true });
		}
	} catch (err) {
		return false;
	}

	return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			(isAuthenticated() ? (
				<Component {...props} />
			) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { isAuthenticated: false }
						}}
					/>
				))}
	/>
);

export default () => (
	<BrowserRouter>
		<Switch>
			<Route path='/' exact component={Home} />
			<Route path='/create' exact component={CreateInvoice} />
			<Route path='/register' exact component={Register} />
			<Route path='/signin' exact component={Signin} />
			<Route path='/signout' exact component={Signout} />
			<Route path='/add-client' exact component={AddClient} />
			<Route path='/clients' exact component={Clients} />
			<Route path='/welcome' exact component={Welcome} />
			<Route path='/bye' exact component={Goodbye} />
		</Switch>
	</BrowserRouter>
)