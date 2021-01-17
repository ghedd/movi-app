import React from "react";
import "./styles.scss";
import ItemList from "../ItemList";
import { movieCollection } from "../../data/index";
// NOTE this is temporary data only
const movies = movieCollection;

const MovieSection: React.FC = () => {
	return (
		<div className="mediaSection">
			<h2 className="mediaSectionList fontMediaSection">movies</h2>
			<ItemList mediaList={movies} />
		</div>
	);
};

export default MovieSection;
