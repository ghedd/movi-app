import { useState, useEffect } from "react";
import { MediaDetails } from "../pages/MediaPage";
import { api } from "../utils/axios/api";

interface ItemFetchProps {
	isLoading: boolean;
	data: MediaDetails;
	error: string;
}

const useItemFetcher = (queryID: string): ItemFetchProps => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [data, setData] = useState<MediaDetails>({} as MediaDetails);

	const getMediaItem = () => {
		api
			.get("/", {
				params: {
					i: `${queryID}`,
				},
			})
			.then((r) => {
				if (r.data.Response === "False") {
					setIsLoading(false);
					setError(r.data.Error);
				}
				const mediaItem = r.data;
				setData(mediaItem);
				setIsLoading(false);
			})
			.catch((e) => {
				setError(e);
				console.log(e);
			});
	};

	useEffect(() => {
		getMediaItem();
	}, []);

	return { isLoading, data, error };
};

export default useItemFetcher;
