import React, { useState, useContext, useEffect } from "react";
import "./styles.scss";

import { ReactComponent as AwardIcon } from "../../assets/icon_add-nomination.svg";
import { NominationListCtx } from "../../context/nominationList.context";
import { MediaItemProps } from "../MediaItem";

interface BtnAddListProps {
	item: MediaItemProps;
}

const ButtonAddToNominationList: React.FC<BtnAddListProps> = ({
	item,
}: BtnAddListProps) => {
	/* ----------------- TODO ---------------- */
	// [ ] create optional flexible tooltip
	/* --------------------------------------- */
	const [isAdded, setIsAdded] = useState<boolean>(false);
	// const [currItem, setCurrItem] = useState({});

	const {
		items,
		addItemToNominationList,
		removeItemFromNominationList,
	} = useContext(NominationListCtx);

	/* --------------- methods --------------- */
	const checkCurrItemInNomList = (
		itemArray: MediaItemProps[],
		curItem: MediaItemProps
	): boolean => {
		// this method checks if current item
		// is in nomination list
		const dup = itemArray.filter((item) => {
			return item.imdbID === curItem.imdbID;
		});
		if (dup.length !== 0) {
			return true;
		} else {
			return false;
		}
	};

	const handleToggle = (): void => {
		setIsAdded(!isAdded);

		isAdded
			? removeItemFromNominationList(item.imdbID)
			: addItemToNominationList(item);
	};
	/* --------------------------------------- */

	useEffect(() => {
		const nomListHasCurrItem = checkCurrItemInNomList(items, item);
		if (nomListHasCurrItem) {
			setIsAdded(true);
		} else {
			setIsAdded(false);
		}
	}, [isAdded, items]);
	return (
		<button
			className={`${
				items.length === 5 && !isAdded ? "addNominationBtn--disabled" : ""
			} btn addNominationBtn`}
			type="button"
			aria-label="Add to my nomination list"
			onClick={() => handleToggle()}
			disabled={items.length === 5 && !isAdded}
		>
			<AwardIcon
				className={` addNominationBtn__icon ${
					isAdded ? "addNominationBtn__icon--added" : ""
				}`}
			/>
		</button>
	);
};

export default ButtonAddToNominationList;
