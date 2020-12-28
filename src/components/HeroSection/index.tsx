import React from "react";
import "./styles.scss";
import bgrImg from "../../assets/the-shire.jpg";
import SearchBar from "../SearchBar";

const HeroSection: React.FC = () => {
	return (
		<section className="heroSection">
			<div className="backgroundImage">
				<img loading="lazy" src={bgrImg} alt="the shire" />
			</div>

			<div className="heroContentWrapper">
				<div className="heroContent">
					<h1 className="heroContent__title">discover now</h1>
					<p className="heroContent__subtitle">
						Your favorite shows are right here
					</p>
					<SearchBar />
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
