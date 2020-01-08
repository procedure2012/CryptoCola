import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header.js';
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render((
	<BrowserRouter>
		<div>
			<App />
			<Header />
		</div>
	</BrowserRouter>
), document.getElementById('root'));
