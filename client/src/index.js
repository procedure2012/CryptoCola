import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Web3 from "web3";

var web3js;

if (window.ethereum) {
	web3js = new Web3(window.ethereum);
	try {
		window.ethereum.enable().then(function () {
			console.log("user allowed.");
		});
	}
	catch(e) {
		console.log("user denied.");
	}
}
else if (window.web3) {
	web3js = new Web3(window.web3.currentProvider);
}
else {
	alert("You have to install metamask!");
}

ReactDOM.render(<App web3js = {web3js} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
