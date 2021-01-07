import React from "react";
import SearchBar from "../../components/SearchBar";
import "./styles.scss";

import bgrImg from "../../assets/the-shire.jpg";
import SearchList from "../../components/SeachList";

const SearchPage: React.FC = () => {
	return (
		<main className="page searchPage">
			<div className="searchPage__searchBarBgr">
				<div className="backgroundImage">
					<img loading="lazy" src={bgrImg} alt="the shire" />
				</div>
			</div>
			<div className="searchBarWrapper">
				<SearchBar />
			</div>
			<SearchList />
		</main>
	);
};

export default SearchPage;
