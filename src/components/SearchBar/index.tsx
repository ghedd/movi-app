import React, { useState, KeyboardEvent, useEffect } from "react";
import "./styles.scss";
import SearchIcon from "./../../assets/ant-design_search-outlined.svg";
import { useHistory, useLocation } from "react-router-dom";
import { getLastSecment } from "../../utils/functions";
// import { getLastSecment } from "../../utils/functions";

interface SearchProps {
	getSearchQuery?: (query: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ getSearchQuery }: SearchProps) => {
	/* ----------------- TODO ---------------- */
	// [ ] use better regex for search
	// string validation
	// [ ] remove console.log

	const [queryString, setQueryString] = useState("");
	const [qStringFromHist, setQStringFromHist] = useState("");

	const { pathname } = useLocation();
	const localQStr = getLastSecment(pathname);
	const history = useHistory();

	const handleChange: React.FormEventHandler<HTMLInputElement> = (event) => {
		setQStringFromHist("");
		setQueryString(event.currentTarget.value);
	};
	const handleEnterKeyPressed = (
		event: KeyboardEvent<HTMLInputElement>
	): void => {
		if (event.key === "Enter") {
			getSearchQuery && getSearchQuery(queryString);
			// // this is for updating query string
			// //  live on url
			history.push(`/search/${queryString}`);
		}
	};

	useEffect(() => {
		setQStringFromHist(localQStr);
	}, []);
	return (
		<div className="searchBar">
			<input
				className="searchBar__input"
				type="text"
				value={qStringFromHist === "" ? queryString : qStringFromHist}
				onChange={handleChange}
				onKeyPress={handleEnterKeyPressed}
			/>
			<button
				className="btn searchBar__btn"
				aria-label="search"
				onClick={() => {
					getSearchQuery && getSearchQuery(queryString);
					history.push(`/search/${queryString}`);
				}}
			>
				<span
					className="searchIcon"
					style={{ backgroundImage: `url(${SearchIcon})` }}
				></span>
			</button>
		</div>
	);
};

export default SearchBar;
