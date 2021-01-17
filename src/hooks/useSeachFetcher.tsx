// import axios from "axios";
import { useState, useEffect } from "react";
import { api } from "../utils/axios/api";

export interface SearchedItemProps {
	Poster: string;
	Title: string;
	Type: string;
	Year: string;
	imdbID: string;
}

interface CollectionFetchProps {
	data: SearchedItemProps[];
	isLoading: boolean;
	error: string;
	maxPageNum: number;
}

const useSearchFetcher = (
	query: string,
	pageNumber: number
): CollectionFetchProps => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [data, setData] = useState<SearchedItemProps[]>([]);
	// const [totalResults, setTotalResults] = useState(0);
	const [maxPageNum, setMaxPageNum] = useState(1);
	const ITEM_PER_PAGE = 10;
	// const [pageNum, setPageNum] = useState(pageNumber);

	/* ----------------- logs ---------------- */
	// console.log(setCurrPage);

	const getSearchedMediaItems = () => {
		api
			.get("/", {
				params: {
					page: pageNumber,
					s: query,
				},
			})
			.then((r) => {
				if (r.data.Response === "False") {
					setIsLoading(false);
					setError(r.data.Error);
					return;
				}
				setMaxPageNum(Math.ceil(r.data.totalResults / ITEM_PER_PAGE));
				setData((prevData) => {
					return [
						...prevData,
						...r.data.Search.map((item: SearchedItemProps) => item),
					];
				});
				setIsLoading(false);
			})
			.catch((e) => {
				setError(e);
				console.log(e);
			});
	};

	useEffect(() => {
		setData([]);
	}, [query]);

	useEffect(() => {
		setIsLoading(true);
		setError("");
		getSearchedMediaItems();
	}, [query, pageNumber]);

	return { isLoading, data, error, maxPageNum };
};

export default useSearchFetcher;
