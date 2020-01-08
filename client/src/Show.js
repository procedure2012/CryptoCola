import React from "react";
import ColaOwnership from "./contracts/ColaOwnership.json";

class Show extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			accountInterval: null,
			colaOwnership: 
				new this.props.web3js.eth.Contract(ColaOwnership.abi, "0x1e24C4B5C1AA0295236d0822A8F7d52a236e86cE"),
			userAccount: null,
			vlue: "myname",
			colas: [],
			count: 0,
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleClick= this.handleClick.bind(this);
	}

	componentDidMount() {
		(async () => {
			//if (this.state.colaOwnership === null || this.state.userAccount === null) return;
			let accounts = await this.props.web3js.eth.getAccounts();
			//console.log(accounts);
			this.setState({userAccount: accounts[0]});
			let count = await this.state.colaOwnership.methods.getCountByOwner(accounts[0]).call();
			//console.log(count);
			this.setState({count: count});
			//if (this.state.colaOwnership === null || this.state.userAccount === null) return;
			let results = await this.state.colaOwnership.methods.getColaByOwner(this.state.userAccount).call();
			let items = [];
			for (let result in results) {
				let cola = await this.state.colaOwnership.methods.colas(result).call();
				items.push(cola);
				//console.log(num);
			}
			this.setState({colas: items});
		}) ();

	}
	
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleClick(event) {
		this.state.colaOwnership.methods.produceRandomCola(this.state.value).send({from: this.state.userAccount});
	}

	render() {
		let names = this.state.colas.map((cola) => <li key={cola.code}> {cola.name} </li>);
		return (
			<div>
				<input type="text" value={this.state.value} onChange={this.handleChange} />
				<button onClick={this.handleClick}>submit</button>
				<div>The Cola(s) of {this.state.userAccount} is</div>
				<div>{this.state.count}</div>
				<div>{names}</div>
			</div>
		)
	}
}

export default Show;
