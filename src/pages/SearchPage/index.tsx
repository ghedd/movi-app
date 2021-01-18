import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import "./styles.scss";

import bgrImg from "../../assets/the-shire.jpg";
import SearchList from "../../components/SeachList";
import { useLocation } from "react-router-dom";
import { getLastSecment } from "../../utils/functions";
import useSearchFetcher from "../../hooks/useSeachFetcher";
import SearchControl from "../../components/SearchControl";

const SearchPage: React.FC = () => {
	/* ---------------- Steps ---------------- */
	// 1. get searc query from URL secment
	// not from search page OR search bar
	// on seach page
	const { pathname } = useLocation();
	const initSearchQuery = getLastSecment(pathname);
	const [searchQuery, setSearchQuery] = useState(initSearchQuery);
	const [pageNum, setPageNum] = useState(1);
	// const [searchResults, setSearchResults] = useState([]);
	// 2. make http request to get search results
	const getSearchQuery = (query: string) => {
		setSearchQuery(query);
	};
	const { data, error, maxPageNum, totalResults, isLoading } = useSearchFetcher(
		searchQuery,
		pageNum
	);

	console.log("Collections: ");
	const moreResults = () => {
		if (pageNum === maxPageNum) return;
		setPageNum(pageNum + 1);
	};
	console.log(`curPage: ${pageNum}, maxPage: ${maxPageNum}`);

	// 3. display to search list

	return (
		<main className="page searchPage">
			<div className="searchPage__searchBarBgr">
				<div className="backgroundImage">
					<img loading="lazy" src={bgrImg} alt="the shire" />
				</div>
			</div>
			<div className="searchBarWrapper">
				<SearchBar getSearchQuery={getSearchQuery} />
			</div>
			<div className="searchResultsWrapper">
				{totalResults ? (
					<span className="resultStatus">
						Found <strong>{totalResults}</strong> result(s) for{" "}
						<span style={{ fontWeight: 700 }}>&quot;{searchQuery}&quot;</span>
					</span>
				) : null}
				{error !== "" ? (
					<span className="resultStatus">{error}</span>
				) : (
					<SearchList searchedItems={data} />
				)}
				{error !== "" || (pageNum === maxPageNum && !isLoading) ? (
					<span className="resultStatus">End of results</span>
				) : (
					<SearchControl isLoading={isLoading} moreResults={moreResults} />
				)}
			</div>
		</main>
	);
};

export default SearchPage;
