import React from "react";
import "./styles.scss";
import SearchItem from "../SearchItem";
import { SearchedItemProps } from "../../hooks/useSeachFetcher";

interface SearchList {
	searchedItems: SearchedItemProps[];
}
const SearchList: React.FC<SearchList> = ({ searchedItems }: SearchList) => {
	return (
		<div className="searchList">
			{searchedItems.map(
				({ Title, imdbID, ...otherProps }: SearchedItemProps) => (
					<SearchItem
						key={imdbID}
						Title={Title}
						imdbID={imdbID}
						{...otherProps}
					/>
				)
			)}
		</div>
	);
};

export default SearchList;
