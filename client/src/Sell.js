import React from 'react';
import ColaPresentation from './contracts/ColaPresentation.json';
import { Container, Card, Button, ButtonToolbar, Row, Col } from 'react-bootstrap';

class Sell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colaPresentation:
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xdcDf9b74959856f0Fab1713043EAAA4A36E4631e"),
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
		return (
            <Container>
                <div class="text-center"><h1>Selling...</h1></div>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://imgur.com/l0TCFn8.jpg"></Card.Img>
                            <Card.Body>
                                <Card.Title>{this.props.location.state.cola.name}</Card.Title>
                                <Card.Text>{this.props.location.state.cola.code}</Card.Text>
                            </Card.Body>
                            <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
				                <input type="text" value={this.state.value} onChange={this.handleChange} />
				                <Button variant="primary" onClick={this.handleClick}>Sell</Button>
                            </ButtonToolbar>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
			</Container>
		);
	};
}

export default Sell;
