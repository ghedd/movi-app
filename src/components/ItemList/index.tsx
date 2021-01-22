import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

import bgrBorder from "./../../assets/film-roll-border.svg";
import MediaItem, { MediaItemProps } from "../MediaItem";

import { ReactComponent as IconNext } from "../../assets/icon_next.svg";
import { ReactComponent as IconPrev } from "../../assets/icon_prev.svg";
import { useAuth } from "../../context/auth.context";
import { Link } from "react-router-dom";

interface ListProps {
	mediaList: MediaItemProps[];
	isNLBlank?: boolean;
}

const ItemList: React.FC<ListProps> = ({ mediaList, isNLBlank }: ListProps) => {
	/* ----------------- TODO ---------------- */

	// [x] style slider buttons
	// [ ] create a custom hook for slider control
	// [ ] create intefraces.tsx for storing
	// 		interfaces
	/* --------------------------------------- */

	const { currUser } = useAuth();
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const [hasOverFlow, setHasOverFlow] = useState(true);
	const sliderRef = useRef<HTMLDivElement>(null);

	const checkForScrollPosition = (): void => {
		if (sliderRef.current !== null) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
		}
	};

	const checkForOverflow = (): void => {
		if (sliderRef.current !== null) {
			const { scrollWidth, clientWidth } = sliderRef.current;
			const hasOverflow = scrollWidth > clientWidth;
			setHasOverFlow(hasOverflow);
		}
	};
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
						hasOverFlow && canScrollLeft ? "" : "sliderControl--disabled"
					} sliderControl sliderControl--prev`}
					disabled={!canScrollLeft}
					onClick={() => handleScroll("left")}
				>
					<IconPrev className="sliderControl__icon" />
				</button>
				<button
					className={`${
						hasOverFlow && canScrollRight ? "" : "sliderControl--disabled"
					} sliderControl sliderControl--next`}
					disabled={!canScrollRight}
					onClick={() => handleScroll("right")}
				>
					<IconNext className="sliderControl__icon" />
				</button>
			</>
		);
	};
	const buildBlankNomiList = () => {
		return (
			<div className="blankList">
				<div className="blankList__deco"></div>
				{currUser ? (
					<span className="blankList__status">
						Decide a list of five nominees of your own!
					</span>
				) : (
					<span className="blankList__status">
						Decide a list of five nominees of your own. <br />
						<Link to="/sign-in">Sign in</Link> to start now!
					</span>
				)}
			</div>
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
		window.addEventListener("resize", () => {
			checkForOverflow();
		});
		// checkForOverflow();
		checkForScrollPosition();
		return () => {
			window.removeEventListener("resize", () => {
				checkForOverflow();
			});
		};
	}, [canScrollLeft, canScrollRight]);

	/* -------- NOTE: component return -------- */

	return (
		<div className="itemList">
			<div
				className="itemList__container "
				style={{
					backgroundImage: `url(${bgrBorder}), url(${bgrBorder})`,
				}}
			>
				{isNLBlank ? buildBlankNomiList() : buildList()}
			</div>
		</div>
	);
};

export default ItemList;
