import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navigtor from './Navigtor.js';
import { BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
    <BrowserRouter>
        <Navigtor />
        <App />
    </BrowserRouter>
), document.getElementById('root'));
