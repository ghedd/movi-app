import React from "react";
import "./styles.scss";
import ButtonAddToNominationList from "../../components/ButtonAddToNominationList";
import RatingRing from "../../components/RatingRing";

// import posterSample from "../../assets/poster_sample.jpg";

const mediaDetails = {
	Title: "Guardians of the Galaxy Vol. 2",
	Year: "2017",
	Rated: "PG-13",
	Released: "05 May 2017",
	Runtime: "136 min",
	Genre: "Action, Adventure, Comedy, Sci-Fi",
	Director: "James Gunn",
	Writer:
		"James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)",
	Actors: "Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel",
	Plot:
		"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
	Language: "English",
	Country: "USA",
	Awards: "Nominated for 1 Oscar. Another 15 wins & 57 nominations.",
	Poster:
		"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
	Ratings: [
		{
			Source: "Internet Movie Database",
			Value: "7.6/10",
		},
		{
			Source: "Rotten Tomatoes",
			Value: "85%",
		},
		{
			Source: "Metacritic",
			Value: "67/100",
		},
	],
	Metascore: "67",
	imdbRating: "7.6",
	imdbVotes: "562,796",
	imdbID: "tt3896198",
	Type: "movie",
	DVD: "N/A",
	BoxOffice: "$389,813,101",
	Production: "Marvel Studios, Walt Disney Pictures",
	Website: "N/A",
	Response: "True",
};

interface MediaDetails {
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
	Ratings: [
		{
			Source: string;
			Value: string;
		},
		{
			Source: string;
			Value: string;
		},
		{
			Source: string;
			Value: string;
		}
	];
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

const MediaPage: React.FC<MediaDetails> = () => {
	return (
		<main className="page mediaPage">
			<div className="mediaPage__topDeco" />
			<div className="mediaPage__details">
				<div className="headlinesWrapper">
					<div className="details__poster">
						<img src={mediaDetails.Poster} alt="poster" loading="lazy" />
					</div>
					<div className="details__ratings">
						{mediaDetails.Ratings.map((r) => (
							<RatingRing
								key={r.Source}
								source={r.Source}
								rating={r.Value}
								size={48}
							/>
						))}
					</div>
					<div className="details__headlines">
						<h1 className="details__title fontMediaPage__title">
							{mediaDetails.Title}
						</h1>
						<span className="details__year">{mediaDetails.Year}</span>
					</div>
					<div className="details__nominationStatus">
						<ButtonAddToNominationList />
						<span>this item is/isnt in your Nomination list</span>
					</div>
				</div>
				<div className="contentsWrapper">
					<p className="details__plot fontMediaPage__plot">
						{mediaDetails.Plot}
					</p>

					<div className="details__otherInfo__short">
						<span className="fontMediaPage__infoLabel">Rated</span>
						<p className="fontMediaPage__infoContent">{mediaDetails.Rated}</p>
						<span className="fontMediaPage__infoLabel">Language</span>
						<p className="fontMediaPage__infoContent">
							{mediaDetails.Language}
						</p>
						<span className="fontMediaPage__infoLabel">Country</span>
						<p className="fontMediaPage__infoContent">{mediaDetails.Country}</p>
						<span className="fontMediaPage__infoLabel">Director</span>
						<p className="fontMediaPage__infoContent">
							{mediaDetails.Director}
						</p>
						<span className="fontMediaPage__infoLabel">Released</span>
						<p className="fontMediaPage__infoContent">
							{mediaDetails.Released}
						</p>
						<span className="fontMediaPage__infoLabel">Runtime</span>
						<p className="fontMediaPage__infoContent">{mediaDetails.Runtime}</p>
						<span className="fontMediaPage__infoLabel">Box office</span>
						<p className="fontMediaPage__infoContent">
							{mediaDetails.BoxOffice}
						</p>
					</div>
					<div className="details__otherInfo__long">
						<span className="fontMediaPage__infoLabel">Genre</span>
						<p className="fontMediaPage__infoContent">{mediaDetails.Genre}</p>
						<span className="fontMediaPage__infoLabel">Writers</span>
						<p className="fontMediaPage__infoContent">{mediaDetails.Writer}</p>
						<span className="fontMediaPage__infoLabel">Actors</span>
						<p className="fontMediaPage__infoContent">{mediaDetails.Actors}</p>
						<span className="fontMediaPage__infoLabel">Awards</span>
						<p className="fontMediaPage__infoContent">{mediaDetails.Awards}</p>
					</div>
				</div>
			</div>
		</main>
	);
};
export default MediaPage;
