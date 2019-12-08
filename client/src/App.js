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
import ColaFactory from "./contracts/ColaFactory.json";
import ColaMixture from "./contracts/ColaMixture.json";
import ColaPresentation from "./contracts/ColaPresentation.json";
import ColaOwnership from "./contracts/ColaOwnership.json";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { web3js: null, colaFactory: null, colaMixture: null, colaPresentation: null, colaOwnership: null };
	}

	componentDidMount() {
		var colaFactoryABI = ColaFactory.abi;
		var colaMixtureABI = ColaMixture.abi;
		var colaPresentationABI = ColaPresentation.abi;
		var colaOwnershipABI = ColaOwnership.abi;
		this.setState((state, props) => ({
			web3js: props.web3js,
			colaFactory: new props.web3js.eth.Contract(colaFactoryABI, "0x88f29Bc914E82Ef1A87825cfE8CABA665f646d12"),
			colaMixture: new props.web3js.eth.Contract(colaMixtureABI, "0x6B415564b1B281902726624E641d8e819Cb3F968"),
			colaPresentation: new props.web3js.eth.Contract(colaPresentationABI, "0x630fF42a8869b77BCaceE4774f5d7014f9a6f9a7"),
			colaOwnership: new props.web3js.eth.Contract(colaOwnershipABI, "0x88f29Bc914E82Ef1A87825cfE8CABA665f646d12")
		}));
	}

	render() {
		return (
			<div> {console.log(this.state.colaFactory)} </div>
		)
	}
}

export default App;
