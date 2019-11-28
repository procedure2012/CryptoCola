/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

import React from "react";
import Web3 from "web3";

var web3js;

if (window.ethereum) {
	web3js = new Web3(window.ethereum);
	try {
		window.ethereum.enable().then(function () {
			console.log("use allow.");
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
	alert('You have to install metamask!');
}

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div> {console.log(web3js)} </div>
		)
	}
}

export default App;
