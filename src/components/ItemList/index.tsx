import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

import bgrBorder from "./../../assets/film-roll-border.svg";
import MediaItem from "../MediaItem";

import { ReactComponent as IconNext } from "../../assets/icon_next.svg";
import { ReactComponent as IconPrev } from "../../assets/icon_prev.svg";

interface ListProps {
	mediaList?: MediaItemProps[];
}

interface MediaItemProps {
	mediaTitle?: string;
	mediaYearOfProd?: string;
	mediaPlot?: string;
	imdbID?: string;
}

const ItemList: React.FC<ListProps> = ({ mediaList }: ListProps) => {
	/* ----------------- TODO ---------------- */

	// [x] style slider buttons
	// [ ] create a custom hook for slider control
	// [ ] create intefraces.tsx for storing
	// 		interfaces
	/* --------------------------------------- */

	// const [hasOverflow, setHasOverFlow] = useState(false);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);

	const checkForScrollPosition = (): void => {
		if (sliderRef.current !== null) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
		}
	};

	/* 	const checkForOverflow = (): void => {
		if (sliderRef.current !== null) {
			const { scrollWidth, clientWidth } = sliderRef.current;
			const hasOverflow = scrollWidth > clientWidth;
			setHasOverFlow(hasOverflow);
		}
	}; */
	const handleScroll = (direction: string): void => {
		if (sliderRef.current !== null) {
			const { clientWidth } = sliderRef.current;
			const dis = clientWidth / 2;

			switch (direction) {
				case "left":
					sliderRef.current.scrollBy({ left: -dis });
					break;

				case "right":
					sliderRef.current?.scrollBy({ left: dis });
					break;
			}
		}
	};

	const sliderControls = () => {
		return (
			<>
				<button
					className={`${
						canScrollLeft ? "" : "sliderControl--disabled"
					} sliderControl sliderControl--prev`}
					disabled={!canScrollLeft}
					onClick={() => handleScroll("left")}
				>
					<IconPrev className="sliderControl__icon" />
				</button>
				<button
					className={`${
						canScrollRight ? "" : "sliderControl--disabled"
					} sliderControl sliderControl--next`}
					disabled={!canScrollRight}
					onClick={() => handleScroll("right")}
				>
					<IconNext className="sliderControl__icon" />
				</button>
			</>
		);
	};

	const buildList = () => {
		return (
			<>
				<div
					className="slider"
					ref={sliderRef}
					onScroll={() => {
						// checkForOverflow();
						checkForScrollPosition();
					}}
				>
					{mediaList?.map(({ mediaTitle, ...otherProps }) => (
						<MediaItem
							key={otherProps.imdbID}
							mediaTitle={mediaTitle}
							{...otherProps}
						/>
					))}
				</div>
				{sliderControls()}
			</>
		);
	};

	useEffect(() => {
		console.log(sliderRef.current);
		// checkForOverflow();
		checkForScrollPosition();
		console.log(
			`Overflow? , 
			Scroll left? ${canScrollLeft}, Scroll right? ${canScrollRight}`
		);
	}, [
		// hasOverflow,
		canScrollLeft,
		canScrollRight,
	]);

	/* -------- NOTE: component return -------- */

	return (
		<div className="itemList">
			<div
				className="itemList__container "
				style={{
					backgroundImage: `url(${bgrBorder}), url(${bgrBorder})`,
				}}
			>
				{buildList()}
				{sliderControls()}
			</div>
		</div>
	);
};

export default ItemList;
