import React from "react";
import "./styles.scss";
import bgrImg from "../../assets/the-shire.jpg";
const HeroSection: React.FC = () => {
	return (
		<section className="heroSection">
			<div className="backgroundImage" style={{backgroundImage: `url(${bgrImg})`}} />
	
			<div className="heroContent">
				<h1 className="title">discover your favorite show</h1>
				<div className="searchBar">
					<input type="text" />
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
