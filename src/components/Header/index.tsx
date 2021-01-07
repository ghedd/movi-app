import React from "react";
import "./styles.scss";
import { ReactComponent as BrandLogo } from "../../assets/icon_brand.svg";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
	return (
		<header className="header">
			<nav className="headerContainer">
				<div className="brand">
					<Link to="/">
						<BrandLogo />
					</Link>
				</div>
				<ul className="navList">
					<li className="navItem">item</li>
					<li className="navItem">item</li>
					<li className="navItem">item</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
