import React from 'react';
import { Container, Jumbotron, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Welcome = () => (
    <Container className="p-3">
        <Jumbotron>
            <div class="text-center"><h1>Nuka Cola</h1></div>
            <div class="text-center"><Image src="https://i.imgur.com/v4pjoSt.jpg" thumbnail fluid /></div>
        </Jumbotron>
    </Container>
)

export default Welcome;
