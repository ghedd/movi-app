import React from "react";
import HeroSection from "../../components/HeroSection";
import MovieSection from "../../components/MovieSection";
// import MediaListByTypes from "../../components/SectionListByMediaTypes";
import "./styles.scss";
const HomePage: React.FC = () => {
	return (
		<div className="page homePage">
			<HeroSection />
			<div className="homePage__container">
				<MovieSection />
				{/* <MediaListByTypes listName="dramas" /> */}
				{/* recent dramas */}
				{/* recently viewed */}
				{/* your nomination list */}
			</div>
		</div>
	);
};

export default HomePage;
