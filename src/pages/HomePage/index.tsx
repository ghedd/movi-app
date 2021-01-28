import React from "react";
import HeroSection from "../../components/HeroSection";
import MovieSection from "../../components/MovieSection";
import NominationSection from "../../components/NominationSection";
// import MediaListByTypes from "../../components/SectionListByMediaTypes";
import "./styles.scss";
const HomePage: React.FC = () => {

	return (
		<main className="page homePage">
			<HeroSection />
			<div className="homePage__container">
				<MovieSection />
				<NominationSection />
			</div>
		</main>
	);
};

export default HomePage;
