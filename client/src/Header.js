import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
		<ul>
			<li><Link to='/show/false'>Show</Link></li>
			<li><Link to='/buy'>Buy</Link></li>
		</ul>
	</header>
)

export default Header;
