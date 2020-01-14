import React from "react";
import ColaPresentation from "./contracts/ColaPresentation.json";
import { Link } from 'react-router-dom';

class Mating extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colaPresentation:
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xead8D1F7306555c61B32bd180f6322a7c8dD0578"),
			userAccount: null,
			value: "name"
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		(async () => {
			//if (this.state.colaPresentation === null || this.state.userAccount === null) return;
			let accounts = await this.props.web3js.eth.getAccounts();
			//console.log(accounts);
			this.setState({userAccount: accounts[0]});

		}) ();

	}

	handleClick() {
		this.state.colaPresentation.methods.mixCola(this.state.value, this.props.location.state.father.id, this.props.location.state.mother.id).send({from: this.state.userAccount}).then(() => {this.props.history.push("/show/false")});
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		console.log(this.props);
		let motherItem;
		this.state.colaPresentation.methods.colas(1).call().then((result) => {console.log(result)});
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
