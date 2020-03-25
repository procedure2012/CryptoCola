import React from "react";
import ColaPresentation from "./contracts/ColaPresentation.json";
import ColaList from './ColaList.js';
import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Show extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			accountInterval: null,
			colaPresentation: 
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xdcDf9b74959856f0Fab1713043EAAA4A36E4631e"),
			userAccount: null,
			vlue: "myname",
			colas: [],
            colaSale: [],
			//count: 0,
		};
	}

	componentDidMount() {
		(async () => {
			//if (this.state.colaPresentation === null || this.state.userAccount === null) return;
			let accounts = await this.props.web3js.eth.getAccounts();
			//console.log(accounts);
			this.setState({userAccount: accounts[0]});
			//let count = await this.state.colaPresentation.methods.getCountByOwner(accounts[0]).call();
			//this.setState({count: count});
			//console.log(count);
			//if (this.state.colaPresentation === null || this.state.userAccount === null) return;
			//let a = await this.state.colaPresentation.methods.colaToAuction(2).call();
			//console.log(a);
			let results = await this.state.colaPresentation.methods.getColaByOwner(this.state.userAccount).call();
			let items = [];
            let sales = [];
			for (let result of results) {
				let cola = await this.state.colaPresentation.methods.colas(result).call();
                let auction = await this.state.colaPresentation.methods.colaToAuction(result).call();
                //console.log(auction);
				cola.id = result;
                if (auction.isOn) {
                    cola.price = auction.price / (10**18);
                    sales.push(cola); 
                } else items.push(cola);
			}
			this.setState({colas: items, colaSale: sales});
		}) ();

	}
	
	handleClick(cola) {
		this.state.colaPresentation.methods.cancelSellCola(cola.id).send({from: this.state.userAccount});
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

        let saleItems = this.state.colaSale.map((saleItem) => (
            <Card>
                <Card.Img variant="top" src="https://imgur.com/l0TCFn8.jpg"></Card.Img>
                <Card.Body>
                    <Card.Title>{saleItem.name}</Card.Title>
                    <Card.Text>{saleItem.price} ETH</Card.Text>
                </Card.Body>
                <Button variant="primary" onClick={this.handleClick.bind(this, saleItem)}>Cancel</Button>
            </Card>
        ));

	    return (
            <Container>
				<div class="text-center"><h1>The Colas on stock are {colaList.length}</h1></div>
                <ColaList items={colaList} />
                <div class="text-center"><h1>The Colas on sale are {saleItems.length}</h1></div>
                <ColaList items={saleItems} />
            </Container>
		)
	}
}

export default Show;
