import React from "react";
import ColaPresentation from "./contracts/ColaPresentation.json";
import { Link } from 'react-router-dom';

class Show extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			accountInterval: null,
			colaPresentation: 
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xead8D1F7306555c61B32bd180f6322a7c8dD0578"),
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
			//if (this.state.colaPresentation === null || this.state.userAccount === null) return;
			let accounts = await this.props.web3js.eth.getAccounts();
			//console.log(accounts);
			this.setState({userAccount: accounts[0]});
			let count = await this.state.colaPresentation.methods.getCountByOwner(accounts[0]).call();
			this.setState({count: count});
			//console.log(count);
			//if (this.state.colaPresentation === null || this.state.userAccount === null) return;
			let a = await this.state.colaPresentation.methods.colaToAuction(2).call();
			console.log(a);
			let results = await this.state.colaPresentation.methods.getColaByOwner(this.state.userAccount).call();
			let items = [];
			for (let result of results) {
				let cola = await this.state.colaPresentation.methods.colas(result).call();
				cola.id = result;
				items.push(cola);
				//console.log(num);
			}
			this.setState({colas: items});
		}) ();

	}
	
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleClick() {
		this.state.colaPresentation.methods.produceRandomCola(this.state.value).send({from: this.state.userAccount});
	}

	render() {
		let names;
		//console.log(this.props);
		if (this.props.match.params.select === 'false') {
			names = this.state.colas.map((cola) => (
				<li key={cola.code}>
					<p>{cola.code}</p>
					<p><Link to={{
						pathname: '/mating',
						state: {
							father: cola
						}
					}}>Mating</Link></p>
					<p><Link to={{
						pathname: '/sell',
						state: {
							cola: cola
						}
					}}>Sell</Link></p>
				</li>
			));
		}
		else {
			names = this.state.colas.map((cola) => (
				<li key={cola.code}>
					<p>{cola.code}</p>
					<p><Link to={{
						pathname: '/mating',
						state: {
							father: this.props.location.state.father,
							mother: cola
						}
					}}>choose as a mother</Link></p>
				</li>
			));

		}
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
