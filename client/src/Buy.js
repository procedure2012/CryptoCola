import React from "react";
import ColaPresentation from "./contracts/ColaPresentation.json";

class Buy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colaPresentation:
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xc6235Eb6FfeEDF3C02BF193904050A5a5e110014"),
			userAccount: null,
			colas: []
		};
	}

	componentDidMount() {
		(async () => {
			let accounts = await this.props.web3js.eth.getAccounts();
			this.setState({userAccount: accounts[0]});
			//console.log(accounts[0]);
			let results = await this.state.colaPresentation.methods.getColaMarket().call();
			//console.log(results);
			let items = [];
			//console.log(results);
			for (let result of results) {
				let cola = await this.state.colaPresentation.methods.colas(result).call();
				cola.id = result;
				items.push(cola);
				//console.log(result);
				//console.log(cola);
			}
			this.setState({colas: items});
		}) ();
	}

	handleClick(cola) {
		//console.log(cola.price);
		this.state.colaPresentation.methods.colaToOwner(cola.id).call().then((seller) => {
			console.log(seller);
			console.log(cola.price*10**18);
			this.state.colaPresentation.methods.buyCola(cola.id).send({from: this.state.userAccount, value: cola.price*10**18}).then(() => {
				console.log(seller);
				console.log(this.state.userAccount);
				console.log(cola.id);
				this.props.history.push('/show/false');
			});
		});
	}

	render() {
		let item = this.state.colas.map((cola) => (
			<li key={cola.code}>
				<p>{cola.code}</p>
				<p>{cola.price}</p>
				<button onClick={this.handleClick.bind(this, cola)}>Buy</button>
			</li>
		));
		return (
			<div>
				<h1>Buy</h1>
				<ul>{item}</ul>
			</div>
		)
	}
}

export default Buy;
