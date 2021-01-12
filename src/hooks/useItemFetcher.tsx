import { useState, useEffect } from "react";
import { MediaDetails } from "../pages/MediaPage";
import api from "../utils/axios/api";

const useItemFetcher = (queryID: string): any => {
	const [status, setStatus] = useState("");
	const [error, setError] = useState("");
	const [data, setData] = useState<MediaDetails>(Object);

	const getMediaItem = async () => {
		await api
			.get("/", {
				params: {
					i: `${queryID}`,
				},
			})
			.then((r) => {
				if (r.data.Response === "False") {
					setStatus("Error");
					setError(r.data.Error);
				}
				const mediaItem = r.data;
				setData(mediaItem);
				setStatus("fetched");
			})
			.catch((e) => {
				setError(e);
				console.log(e);
			});
	};

	useEffect(() => {
		getMediaItem();
	}, []);

	return { status, data, error };
};

export default useItemFetcher;
