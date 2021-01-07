import React from "react";
import "./styles.scss";
import SearchItem from "../SearchItem";

const SearchList: React.FC = () => {
	return (
		<div className="searchList">
			<SearchItem />
		</div>
	);
};

export default SearchList;
