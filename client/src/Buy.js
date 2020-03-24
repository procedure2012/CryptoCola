import React from "react";
import ColaPresentation from "./contracts/ColaPresentation.json";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

class Buy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colaPresentation:
				new this.props.web3js.eth.Contract(ColaPresentation.abi, "0xB07bE22286d545BfA46b6BA3742C5C67956bcD27"),
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
				let auction = await this.state.colaPresentation.methods.colaToAuction(result).call();
				cola.id = result;
                cola.price = auction.price / (10**18);
				items.push(cola);
				//console.log(result);
				//console.log(cola);
			}
			this.setState({colas: items});
		}) ();
	}

	handleClick(cola) {
		//console.log(cola.id);
        this.state.colaPresentation.methods.colaToAuction(cola.id).call().then((auction) => {
            console.log(auction);
		    this.state.colaPresentation.methods.buyCola(cola.id).send({from: this.state.userAccount, value: auction.price}).then(() => {
			    this.props.history.push('/show/false');
		    });
        });
		//this.props.web3js.eth.getBalance(this.state.userAccount).then(console.log);
		//this.state.colaPresentation.methods.colaToAuction(cola.id).call().then((result) => {console.log(result.price)});
	}

	render() {
		let colaList = this.state.colas.map((cola) => (
            <Card>
                <Card.Img variant="top" src="https://imgur.com/l0TCFn8.jpg"></Card.Img>
                <Card.Body>
                    <Card.Title>{cola.name}</Card.Title>
                    <Card.Text>{cola.price} ETH</Card.Text>
                </Card.Body>
				<Button onClick={this.handleClick.bind(this, cola)}>Buy</Button>
            </Card>
		));

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
				<div class="text-center"><h1>Buy</h1></div>
                {rowList}
			</Container>
		)
	}
}

export default Buy;
