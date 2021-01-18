import React from "react";
import "./styles.scss";
import { ReactComponent as BrandLogo } from "../../assets/icon_brand.svg";
import { Link } from "react-router-dom";
import NominationCounter from "../NominationCounter";
import { useAuth } from "../../context/auth.context";
const Header: React.FC = () => {
	const { currUser, logOut } = useAuth();

	return (
		<header className="header">
			<nav className="headerContainer">
				<div className="brand">
					<Link to="/">
						<BrandLogo />
					</Link>
				</div>
				<ul className="navList">
					<NominationCounter />
					<li className="navItem">
						{currUser ? (
							<span style={{ cursor: "pointer" }} onClick={() => logOut()}>
								Sign Out
							</span>
						) : (
							<Link to="/sign-in">Sign In</Link>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
