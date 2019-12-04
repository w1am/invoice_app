import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import CreateInvoice from './CreateInvoice';
import Register from './Register';
import Signin from './Signin';
import AddClient from './AddClient';
import Welcome from './Welcome';
import Signout from './Signout';
import Goodbye from './Goodbye';
import Clients from './Clients';
import InvoicePage from './InvoicePage';

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
			<Route path='/invoice' exact component={InvoicePage} />
		</Switch>
	</BrowserRouter>
)