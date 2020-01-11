import React from "react";
import ColaOwnership from "./contracts/ColaOwnership.json";
import { Link } from 'react-router-dom';

class Mating extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colaOwnership:
				new this.props.web3js.eth.Contract(ColaOwnership.abi, "0x06123Fa63C8C9b2B636f164160Bd1669405Fb4ee"),
			userAccount: null,
			value: "name"
		};
		this.handleClick= this.handleClick.bind(this);
		this.handleChange= this.handleChange.bind(this);
	}

	componentDidMount() {
		(async () => {
			//if (this.state.colaOwnership === null || this.state.userAccount === null) return;
			let accounts = await this.props.web3js.eth.getAccounts();
			//console.log(accounts);
			this.setState({userAccount: accounts[0]});

		}) ();

	}

	handleClick(event) {
		this.state.colaOwnership.methods.mixCola(this.state.value, this.props.location.state.father.id, this.props.location.state.mother.id).send({from: this.state.userAccount}).then(() => {this.props.history.push("/show/false")});
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		console.log(this.props);
		let motherItem;
		this.state.colaOwnership.methods.colas(1).call().then((result) => {console.log(result)});
		if (this.props.location.state.mother === undefined) {
			motherItem = <Link to={{
					pathname: '/show/true',
					state: {father: this.props.location.state.father}
				}}>choose a mother</Link>
		}
		else {
			motherItem = this.props.location.state.mother.code
		}
		return (
			<div>
				<h1>Mating</h1>	
				<div>{this.props.location.state.father.code}</div>
				<div>{motherItem}</div>
				<input type="text" value={this.state.value} onChange={this.handleChange} />
				<button onClick={this.handleClick}>Mixture</button>
			</div>
		)
	}
}

export default Mating;
