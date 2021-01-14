import React from "react";
import "./styles.scss";
import ItemList from "../ItemList";

// NOTE this is temporary data only
const mediaArray = [
	{
		mediaTitle: "The Lord of the Rings: The Fellowship of the Ring",
		mediaYearOfProd: "2001",
		imdbID: "tt0120737",
		mediaPoster:
			"https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
	},
	{
		mediaTitle: "The Lord of the Rings: The Return of the King",
		mediaYearOfProd: "2003",
		imdbID: "tt0167260",
		mediaPoster:
			"https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
	},
	{
		mediaTitle: "The Lord of the Rings: The Two Towers",
		mediaYearOfProd: "2002",
		imdbID: "tt0167261",
		mediaPoster:
			"https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
];

const MovieSection: React.FC = () => {
	return (
		<div className="mediaSection">
			<h2 className="mediaSectionList fontMediaSection">movies</h2>
			<ItemList mediaList={mediaArray} />
		</div>
	);
};

export default MovieSection;
