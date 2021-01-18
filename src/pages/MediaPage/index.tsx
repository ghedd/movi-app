import React from "react";
import "./styles.scss";
import ButtonAddToNominationList from "../../components/ButtonAddToNominationList";
import RatingRing from "../../components/RatingRing";
import altPoster from "../../assets/alt_poster.png";
import { Redirect, useLocation } from "react-router-dom";
import useItemFetcher from "../../hooks/useItemFetcher";
import { getLastSecment } from "../../utils/functions";
import { UNAVAILABLE } from "../../utils/constants";
// import MediaItem from "../../components/MediaItem";

export interface MediaDetails {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: Rating[];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
}
interface QueryProp {
	query: string;
}
interface Rating {
	Source: string;
	Value: string;
}
const MediaPage: React.FC<QueryProp> = ({ query }: QueryProp) => {
	const { pathname } = useLocation();
	const localQuery = getLastSecment(pathname);

	const { data, isLoading, error } = !query
		? useItemFetcher(localQuery)
		: useItemFetcher(query);
	const ratings: Rating[] = data.Ratings;

	/* ----------------- TODO ---------------- */
	// [ ] get data using custom hook
	/* --------------------------------------- */

	if (isLoading)
		return (
			<main className="page mediaPage">
				<h1>Loading...</h1>
			</main>
		);
	if (error !== "") return <Redirect to="/404" />;
	return (
		<main className="page mediaPage">
			<div className="mediaPage__topDeco" />
			<div className="mediaPage__details">
				<div className="headlinesWrapper">
					<div className="details__poster">
						<picture>
							<img
								src={data.Poster !== UNAVAILABLE ? data.Poster : altPoster}
								alt="poster"
								loading="lazy"
							/>
							<source srcSet={altPoster} />
						</picture>
					</div>
					<div className="details__ratings">
						{ratings && ratings.length !== 0 ? (
							ratings.map((r) => (
								<RatingRing
									key={r.Source}
									source={r.Source}
									rating={r.Value}
									size={48}
								/>
							))
						) : (
							<span>Ratings currently unavailable</span>
						)}
					</div>
					<div className="details__headlines">
						<h1 className="details__title fontMediaPage__title">
							{data.Title}
						</h1>
						<span className="details__year">{data.Year}</span>
					</div>
					<div className="details__nominationStatus">
						<ButtonAddToNominationList
							item={{
								imdbID: data.imdbID,
								mediaTitle: data.Title,
								mediaYearOfProd: data.Year,
								mediaPoster: data.Poster,
							}}
						/>
						<span>this item is/isnt in your Nomination list</span>
					</div>
				</div>
				<div className="contentsWrapper">
					<p className="details__plot fontMediaPage__plot">
						{data.Plot !== UNAVAILABLE
							? data.Plot
							: `Looks like the plot of this ${data.Type} is so straighforward that everyone can guess...`}
					</p>

					<div className="details__otherInfo__short">
						<span className="fontMediaPage__infoLabel">Rated</span>
						<p className="fontMediaPage__infoContent">{data.Rated}</p>
						<span className="fontMediaPage__infoLabel">Language</span>
						<p className="fontMediaPage__infoContent">{data.Language}</p>
						<span className="fontMediaPage__infoLabel">Country</span>
						<p className="fontMediaPage__infoContent">{data.Country}</p>
						<span className="fontMediaPage__infoLabel">Director</span>
						<p className="fontMediaPage__infoContent">{data.Director}</p>
						<span className="fontMediaPage__infoLabel">Released</span>
						<p className="fontMediaPage__infoContent">{data.Released}</p>
						<span className="fontMediaPage__infoLabel">Runtime</span>
						<p className="fontMediaPage__infoContent">{data.Runtime}</p>
						<span className="fontMediaPage__infoLabel">Box office</span>
						<p className="fontMediaPage__infoContent">{data.BoxOffice}</p>
					</div>
					<div className="details__otherInfo__long">
						<span className="fontMediaPage__infoLabel">Genre</span>
						<p className="fontMediaPage__infoContent">{data.Genre}</p>
						<span className="fontMediaPage__infoLabel">Writers</span>
						<p className="fontMediaPage__infoContent">{data.Writer}</p>
						<span className="fontMediaPage__infoLabel">Actors</span>
						<p className="fontMediaPage__infoContent">{data.Actors}</p>
						<span className="fontMediaPage__infoLabel">Awards</span>
						<p className="fontMediaPage__infoContent">{data.Awards}</p>
					</div>
				</div>
			</div>
		</main>
	);
};
export default MediaPage;
