import React, { useState, useEffect } from "react";
import "./styles.scss";

interface RatingProps {
	rating: string;
	source: string;
	size?: number;
}

const RatingRing: React.FC<RatingProps> = ({
	rating,
	source,
	size = 60,
}: RatingProps) => {
	const [ratingDisplayVal, setRatingDisplayVal] = useState(0);

	/* ----------- ring properties ----------- */
	// const size = 120;
	const cx = size / 2;
	const cy = size / 2;
	const strokeWidth = 4;
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const setStrokeDashOffset = (percent: number): number => {
		const offset = circumference - (percent / 100) * circumference;
		return offset;
	};

	const fillColor = {
		imdb: "#F5C518",
		rottenTomatoes: "#FA320A",
		metaCritic: "#66CC33",
	};
	/* --------------------------------------- */

	const IMDB = "Internet Movie Database";
	const ROTTEN_TOMATOES = "Rotten Tomatoes";
	const META_CRITIC = "Metacritic";
	const convertRatingStringToNum = (
		ratingString: string,
		ratingSource: string
	): number => {
		let ratingNum = 0;
		switch (ratingSource) {
			case IMDB:
				ratingNum = parseFloat(ratingString.slice(0, 3)) * 10;
				break;
			default:
				ratingNum = parseFloat(ratingString.slice(0, 3));
				break;
		}
		return ratingNum;
	};

	const convertedRating = convertRatingStringToNum(rating, source);
	const strokeDashoffset = setStrokeDashOffset(ratingDisplayVal);

	useEffect(() => {
		const progress = setTimeout(() => {
			setRatingDisplayVal(ratingDisplayVal + 1);
		}, 5);

		if (ratingDisplayVal === convertedRating) clearTimeout(progress);
	}, [ratingDisplayVal]);

	return (
		<div className="rating">
			<span
				className="rating__value"
				style={
					source !== ROTTEN_TOMATOES
						? { color: "#0e0e0e" }
						: { color: "inherit" }
				}
			>
				{source === IMDB
					? ratingDisplayVal / 10
					: source === ROTTEN_TOMATOES
					? `${ratingDisplayVal}%`
					: ratingDisplayVal}
			</span>
			<svg className="rating__placeholder" height={size} width={size}>
				<circle
					className="rating__ring"
					strokeWidth={strokeWidth}
					fill={
						source === IMDB
							? fillColor.imdb
							: source === META_CRITIC
							? fillColor.metaCritic
							: fillColor.rottenTomatoes
					}
					r={radius}
					cx={cx}
					cy={cy}
					strokeDasharray={`${circumference} ${circumference}`}
					style={{ strokeDashoffset }}
				/>
			</svg>
		</div>
	);
};

export default RatingRing;
