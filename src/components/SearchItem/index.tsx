import React from "react";
import "./styles.scss";
import altPoster from "../../assets/alt_poster.png";
// import posterMock from "../../assets/the-shire-2.png";
import { SearchedItemProps } from "../../hooks/useSeachFetcher";
import { Link } from "react-router-dom";
import { MediaItemProps } from "../MediaItem";
import ButtonAddToNominationList from "../ButtonAddToNominationList";

const UNAVAI_POSTER = "N/A";

const SearchItem: React.FC<SearchedItemProps> = ({
	Title,
	...otherProps
}: SearchedItemProps) => {
	const nomListItem: MediaItemProps = {
		imdbID: otherProps.imdbID,
		mediaTitle: Title,
		mediaPoster: otherProps.Poster,
		mediaYearOfProd: otherProps.Year,
	};

	return (
		<div className="searchItem">
			<div className="searchItem__poster">
				<Link to={`/item/${otherProps.imdbID}`}>
					<img
						src={
							otherProps.Poster === UNAVAI_POSTER
								? altPoster
								: otherProps.Poster
						}
						alt="poster"
					/>
				</Link>
			</div>
			<div className="searchItem__brief">
				<span className="searchItem__brief__title fontMediaItem__title">
					<Link to={`/item/${otherProps.imdbID}`}>{Title}</Link>
				</span>
				<span className="searchItem__brief__year fontMediaItem__year">
					{otherProps.Year}
				</span>
			</div>
			<ButtonAddToNominationList item={nomListItem} />
		</div>
	);
};

export default SearchItem;
