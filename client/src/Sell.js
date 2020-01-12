import React from 'react';
import ColaPresentation from './contracts/ColaPresentation.json';

class Sell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colaPresentation:
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xc6235Eb6FfeEDF3C02BF193904050A5a5e110014"),
			userAccount: null,
			value: "cost"
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		(async () => {
			let accounts = await this.props.web3js.eth.getAccounts();
			this.setState({userAccount: accounts[0]});
		}) ();
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleClick(event) {
		this.state.colaPresentation.methods.sellCola(this.props.location.state.cola.id, this.state.value).send({from: this.state.userAccount}).then(() => {this.props.history.push('/show/false')});
	}

	render() {
		console.log(this.props.location);
		return (
			<div>
				<h1>{this.props.location.state.cola.code}</h1>
				<input type="text" value={this.state.value} onChange={this.handleChange} />
				<button onClick={this.handleClick}>Sell</button>
			</div>
		);
	};
}

export default Sell;
