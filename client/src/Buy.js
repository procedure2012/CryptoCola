import React from "react";
import ColaPresentation from "./contracts/ColaPresentation.json";

class Buy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colaPresentation:
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xead8D1F7306555c61B32bd180f6322a7c8dD0578"),
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
		/*console.log(cola.id);
		console.log(this.state.colaPresentation.methods);
		(async () => {
			//let count = await this.state.colaPresentation.methods.getCountByOwner(this.state.userAccount).call();
			await this.state.colaPresentation.methods.buyCola(cola.id).send({from: this.state.userAccount, gasLimit: 1000000});
		}) ();*/
		//this.props.web3js.eth.getBalance(this.state.userAccount).then(console.log);
		//this.state.colaPresentation.methods.colaToAuction(cola.id).call().then((result) => {console.log(result.price)});
		this.state.colaPresentation.methods.buyCola(cola.id).send({from: this.state.userAccount, gasLimit: 1000000}).then(() => {
			console.log(this.state.userAccount);
			console.log(cola.id);
			this.props.history.push('/show/false');
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
