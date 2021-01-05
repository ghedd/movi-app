import React, { useRef, useState } from "react";
import "./styles.scss";

interface MediaItemProps {
	mediaTitle?: string;
	mediaYearOfProd?: string;
	mediaPlot?: string;
	imdbID?: string;
}
const MediaItem: React.FC<MediaItemProps> = ({
	mediaTitle,
	...otherProps
}: MediaItemProps) => {
	/* ----------------- TODO ---------------- */
	// [ ] create dynamic translateX to left/right
	// 		most elements on hover
	/* --------------------------------------- */

	const [isRightMost, setIsRightMost] = useState<boolean | undefined>(
		undefined
	);
	const [isLeftMost, setIsLeftMost] = useState<boolean | undefined>(undefined);
	const itemRef = useRef<HTMLDivElement>(null);
	const checkForLeftOrRightMost = (): void => {
		const parentRightBouding =
			itemRef.current?.parentElement?.getBoundingClientRect().right || 0;
		const parentLeftBouding =
			itemRef.current?.parentElement?.getBoundingClientRect().left || 0;
		const itemLeftBounding =
			itemRef?.current?.getBoundingClientRect().left || 0;
		const clientWidth = itemRef?.current?.clientWidth || 0;
		const listGlutter = 16;
		const distance = parentRightBouding - itemLeftBounding;
		setIsLeftMost(itemLeftBounding - parentLeftBouding < 10);
		setIsRightMost(
			distance < clientWidth || distance < clientWidth + listGlutter
		);

		// console.log(`Parent: ${parentLeftBouding}, Item: ${itemLeftBounding}`);
		// console.log(
		// 	`left most: ${isLeftMost}, right most: ${isRightMost}, distance: ${distance}, client width: ${clientWidth}, glutter: ${listGlutter} `
		// );
	};
	const resetHoverEffect = (): void => {
		setIsLeftMost(undefined);
		setIsRightMost(undefined);
	};
	return (
		<div
			className={`${
				isRightMost ? "rightMost" : isLeftMost ? "leftMost" : ""
			}  mediaItem`}
			ref={itemRef}
			onMouseEnter={() => {
				setTimeout(() => {
					checkForLeftOrRightMost();
				}, 200);
			}}
			onMouseLeave={() => resetHoverEffect()}
		>
			<div className="mediaItem__poster">Poster</div>
			<div className="mediaItem__brief">
				<span className="mediaTitle">{mediaTitle || `I am an item`}</span>
				<span className="mediaYear">
					{otherProps.mediaYearOfProd || `20xx`}
				</span>
				<p className="mediaPlot">
					{otherProps.mediaPlot ||
						`Lorem isplot dolor sit amet consectetur adipisicing elit. Autem, possimus? Quaerat cupiditate officiis reprehenderit ut?`}
				</p>
			</div>
		</div>
	);
};

export default MediaItem;
