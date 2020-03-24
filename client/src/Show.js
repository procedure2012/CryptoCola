import React from "react";
import ColaPresentation from "./contracts/ColaPresentation.json";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Show extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			accountInterval: null,
			colaPresentation: 
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xB07bE22286d545BfA46b6BA3742C5C67956bcD27"),
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
			//let a = await this.state.colaPresentation.methods.colaToAuction(2).call();
			//console.log(a);
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
        let colaList;
        if (this.props.match.params.select === 'false') {
            colaList = this.state.colas.map((cola) => (
                <Card>
                    <Card.Img variant="top" src="https://imgur.com/l0TCFn8.jpg"></Card.Img>
                    <Card.Body>
                        <Card.Title>{cola.name}</Card.Title>
                        <Card.Text>{cola.code}</Card.Text>
                    </Card.Body>
                    <div>
                    <Link to={{
				        pathname: '/mating',
					    state: {
					        father: cola
				        }
				    }}><Button variant="primary" block>Mix</Button></Link>
                    <br/>
                    <Link to={{
				        pathname: '/sell',
				        state: {
				            cola: cola
					    }
			        }}><Button variant="primary" block>Sell</Button></Link>
                    </div>
                </Card>
            ));
        }
        else {
            colaList = this.state.colas.map((cola) => (
                <Card>
                    <Card.Img variant="top" src="https://imgur.com/l0TCFn8.jpg"></Card.Img>
                    <Card.Body>
                        <Card.Title>{cola.name}</Card.Title>
                        <Card.Text>{cola.code}</Card.Text>
                    </Card.Body>
                    <Link to={{
					    pathname: '/mating',
						state: {
						    father: this.props.location.state.father,
						    mother: cola
						}
					}}><Button variant="primary">choose as a mother</Button></Link>
                </Card>
            ));
        }

        let colList=[], rowList=[];
        colaList.forEach((colaItem, index) => {
                var item = (
                    <Col xs={3} md={3} lg={3}>{colaItem}</Col>
                );
                colList.push(item);

                if (((index % 3) === 0 && (index !== 0)) || (index === colaList.length-1)) {
                        item = (
                            <Row>
                                {colList}
                            </Row>
                        );
                        rowList.push(item);
                        colList = [];
                }
        });
		
		return (
            <Container>
			<div>
				<input type="text" value={this.state.value} onChange={this.handleChange} />
				<button onClick={this.handleClick}>submit</button>
				<div class="text-center"><h1>The Cola(s) of {this.state.userAccount} is {this.state.count}</h1></div>
				<div>{rowList}</div>
			</div>
            </Container>
		)
	}
}

export default Show;
