import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import MovieSection from "../../components/MovieSection";
// import MediaListByTypes from "../../components/SectionListByMediaTypes";
import "./styles.scss";
const HomePage: React.FC = () => {
	return (
		<div className="homePage">
			<Header />
			<HeroSection />
			<div className="homePage__container">
				<MovieSection />
				{/* <MediaListByTypes listName="dramas" /> */}
				{/* recent dramas */}
				{/* recently viewed */}
				{/* your nomination list */}
			</div>
			<Footer />
		</div>
	);
};

export default HomePage;
