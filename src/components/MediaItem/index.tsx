import React from // useRef,
// useState,
"react";
import "./styles.scss";
import { truncateText } from "../../utils/functions";
import { useHistory } from "react-router-dom";
import ButtonAddToNominationList from "../ButtonAddToNominationList";
export interface MediaItemProps {
	mediaTitle?: string;
	mediaYearOfProd?: string;
	imdbID: string;
	mediaPoster?: string;
}
const MediaItem: React.FC<MediaItemProps> = ({
	mediaTitle,
	...otherProps
}: MediaItemProps) => {
	/* ----------------- TODO ---------------- */
	// [x] create dynamic translateX to left/right
	// 		most elements on hover (NOTE partly done)
	// [ ] remove unneccesary code
	/* --------------------------------------- */

	/* const [isRightMost, setIsRightMost] = useState<boolean | undefined>(
		undefined
	);
	const [isLeftMost, setIsLeftMost] = useState<boolean | undefined>(undefined);
	const itemRef = useRef<HTMLDivElement>(null); */
	// const [item, setItem] = useState({});
	const history = useHistory();

	// const linkToMediaPage = "/item/tt1285016";

	/* 	const checkForLeftOrRightMost = (): void => {
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

	
	}; */

	// const loremIpsum =
	// 	"Lorem isplot dolor sit amet consectetur adipisicing elit. Autem, possimus? Quaerat cupiditate officiis reprehenderit ut?";
	/* 	const resetHoverEffect = (): void => {
		setIsLeftMost(undefined);
		setIsRightMost(undefined);
	}; */

	const item: MediaItemProps = {
		mediaTitle,
		imdbID: otherProps.imdbID,
		mediaYearOfProd: otherProps.mediaYearOfProd,
		mediaPoster: otherProps.mediaPoster,
	};

	const handleClick = (): void => {
		// NOTE temporary
		// history.push( linkToMediaPage );
		// console.log(linkToMediaPage);
		// console.log(history);
		history.push(`item/${otherProps.imdbID}`);
	};
	return (
		<div
			/* className={`${
				isRightMost ? "rightMost" : isLeftMost ? "leftMost" : ""
			}  mediaItem`}
			ref={itemRef} */
			className="mediaItem"
			/* onMouseEnter={() => {
				setTimeout(() => {
					checkForLeftOrRightMost();
				}, 200);
			}} */
			/* onMouseLeave={() =>
				setTimeout(() => {
					resetHoverEffect();
				}, 200)
			} */
		>
			<div
				className="mediaItem__poster"
				style={{ backgroundImage: `url(${otherProps.mediaPoster})` }}
				onClick={() => handleClick()}
			></div>
			<ButtonAddToNominationList item={item} />
			<div className="mediaItem__brief">
				<span className="mediaItem__brief__title  fontMediaItem__title">
					{truncateText(mediaTitle, 40)}
				</span>
				<span className="mediaItem__brief__year fontMediaItem__year">
					{otherProps.mediaYearOfProd}
				</span>

				{/* <p className="mediaItem__brief__plot fontMediaItem__plot">
					{truncateText(otherProps.mediaPlot, 80) ||
						truncateText(loremIpsum, 80)}
				</p> */}
			</div>
		</div>
	);
};

export default MediaItem;
