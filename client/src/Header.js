import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const Header = () => (
	<Navbar bg="dark" >
        <Navbar.Brand>
            <img src="https://imgur.com/l0TCFn8.jpg" className="d-inline-block align-top" height="30" alt="logo"/>
			<Link to='/show/false'>Get your Colas!</Link>
        </Navbar.Brand>
	    <Link to='/buy'>Buy</Link>
	</Navbar>
)

export default Header;
