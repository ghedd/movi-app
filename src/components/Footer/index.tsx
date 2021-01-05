import React from "react";
import "./styles.scss";

const Footer: React.FC = () => {
	const date = new Date();
	const currentYear = date.getFullYear();

	return (
		<footer className="footer">
			<div className="footer__container fontFooter">
				<span>{`©${currentYear} `} by Thinh Eddie Le</span>
			</div>
		</footer>
	);
};

export default Footer;
