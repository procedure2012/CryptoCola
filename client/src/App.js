import React from "react";
import Show from './Show';
import Buy from './Buy';
import Mating from './Mating';
import Sell from './Sell';
import { Switch, Route } from 'react-router-dom';
import Web3 from "web3";

function App(props) {
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

	return (
		<Switch>
			<Route path='/show/:select' render={(props) => (<Show {...props} web3js={web3js}/>)} />
			<Route path='/buy' render={(props) => (<Buy {...props} web3js={web3js}/>)}/>
			<Route path='/sell' render={(props) => (<Sell {...props} web3js={web3js}/>)}/>
			<Route path='/mating' render={(props) => (<Mating {...props} web3js={web3js}/>)}/>
		</Switch>
	)
}

export default App;
