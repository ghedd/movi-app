import React from "react";
import "./styles.scss";
import ItemList from "../ItemList";

// NOTE this is temporary data only
const mediaArray = [
	{
		mediaTitle: "Mad Max",
		mediaYearOfProd: "2010",
		imdbID: "1234",
	},
	{
		mediaTitle: "2012",
		mediaYearOfProd: "2010",
		imdbID: "1432",
	},
	{
		mediaTitle: "Mad Max",
		mediaYearOfProd: "2010",
		imdbID: "1324",
	},
	{
		mediaTitle: "2012",
		mediaYearOfProd: "2010",
		imdbID: "4321",
	},
	{
		mediaTitle: "Mad Max",
		mediaYearOfProd: "2010",
		imdbID: "4213",
	},
	{
		mediaTitle: "2012",
		mediaYearOfProd: "2010",
		imdbID: "3412",
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
