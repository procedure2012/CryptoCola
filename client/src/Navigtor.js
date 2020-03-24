import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigtor = () => (
   <Navbar bg="dark" varient="dark">
        <Navbar.Brand>
            <img src="https://imgur.com/l0TCFn8.jpg" className="d-inline-block align-top" height="30" alt="logo"/>
        </Navbar.Brand>
        <Nav>
			<Nav.Item><Link to='/show/false'>Home</Link></Nav.Item>
	        <Nav.Item><Link to='/buy'>Buy</Link></Nav.Item>
        </Nav>
   </Navbar>
)

export default Navigtor;
