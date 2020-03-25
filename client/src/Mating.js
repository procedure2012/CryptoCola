import React from "react";
import ColaPresentation from "./contracts/ColaPresentation.json";
import { Link } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';

class Mating extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colaPresentation:
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xdcDf9b74959856f0Fab1713043EAAA4A36E4631e"),
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
		//console.log(this.props);
		let motherItem;
		//this.state.colaPresentation.methods.colas(1).call().then((result) => {console.log(result)});
		if (this.props.location.state.mother === undefined) {
			motherItem = <Row>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="https://imgur.com/awUcYbQ.jpg"></Card.Img>
                        <Card.Body>
                            <Card.Title>{this.props.location.state.father.name}</Card.Title>
                            <Card.Text>{this.props.location.state.father.code} as father</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="https://imgur.com/awUcYbQ.jpg"></Card.Img>
                        <Card.Body>
                            <Card.Text>?</Card.Text>
                        </Card.Body>
                        <Link to={{
					        pathname: '/show/true',
					        state: {father: this.props.location.state.father}
				        }}><Button variant="primary">choose a mother</Button></Link>
                    </Card> 
                </Col>
            </Row>
		}
		else {
			motherItem = <Row>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="https://imgur.com/l0TCFn8.jpg"></Card.Img>
                        <Card.Body>
                            <Card.Title>{this.props.location.state.father.name}</Card.Title>
                            <Card.Text>{this.props.location.state.father.code} as father</Card.Text>
                        </Card.Body>
                    </Card>            
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="https://imgur.com/l0TCFn8.jpg"></Card.Img>
                        <Card.Body>
                            <Card.Title>{this.props.location.state.mother.name}</Card.Title>
                            <Card.Text>{this.props.location.state.mother.code} as mother</Card.Text>
                        </Card.Body>
                    </Card>       
                </Col>
            </Row>
		}
		return (
			<Container>
				<div class="text-center"><h1>Mixture</h1></div>	
				{motherItem}
                <br/>
                <div class="text-center">
				    <input type="text" value={this.state.value} onChange={this.handleChange} />
				    <button onClick={this.handleClick}>Mixture</button>
                </div>
			</Container>
		)
	}
}

export default Mating;
