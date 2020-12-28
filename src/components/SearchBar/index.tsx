import React from "react";
import "./styles.scss";
import SearchIcon from "./../../assets/ant-design_search-outlined.svg";

const SearchBar: React.FC = () => {
	return (
		<div className="searchBar">
			<input className="searchBar__input" type="text" />
			<button className="searchBar__btn" aria-label="search">
				<span
					className="searchIcon"
					style={{ backgroundImage: `url(${SearchIcon})` }}
				></span>
			</button>
		</div>
	);
};

export default SearchBar;
