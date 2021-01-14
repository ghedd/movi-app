import React, {
	useState,
	// useReducer
	useContext,
	useEffect,
} from "react";
import "./styles.scss";

import { ReactComponent as AwardIcon } from "../../assets/icon_add-nomination.svg";
import { NominationListCtx } from "../../context/nominationList.context";
import { MediaItemProps } from "../MediaItem";
// export const ACTIONS = {
// 	ADD_TO_LIST: "adding",
// 	REMOVE_FROM_LIST: "removing",
// };

// const LIST_MAX = 5;
// const LIST_MIN = 0;
// // const LIMIT_ADDING = "limitAdding";
// const initialState = {
// 	count: 0,
// 	isFull: false,
// };

// const nominationListReducer = (state: any, action: any) => {
// 	switch (action.type) {
// 		case ACTIONS.ADD_TO_LIST:
// 			return state.count === LIST_MAX
// 				? { ...state, isFull: true }
// 				: { ...state, count: state.count + 1 };
// 		case ACTIONS.REMOVE_FROM_LIST:
// 			return state.count === LIST_MIN
// 				? { isFull: false, count: 0 }
// 				: { ...state, count: state.count - 1 };
// 		default:
// 			return state;
// 	}
// };

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

	// const [state, dispatch] = useReducer(nominationListReducer, initialState);

	const {
		items,
		addItemToNominationList,
		removeItemFromNominationList,
	} = useContext(NominationListCtx);

	const duplicateCheck = (
		itemArray: MediaItemProps[],
		curItem: MediaItemProps
	) => {
		const dup = itemArray.filter((item) => {
			return item.imdbID === curItem.imdbID;
		});
		return dup;
	};

	const handleToggle = (): void => {
		setIsAdded(!isAdded);
		// console.log(isAdded);
		isAdded
			? removeItemFromNominationList(item.imdbID)
			: addItemToNominationList(item);
	};

	useEffect(() => {
		const dup = duplicateCheck(items, item);
		if (dup.length !== 0) setIsAdded(true);
	}, [isAdded]);
	return (
		<button
			className="btn addNominationBtn"
			type="button"
			aria-label="Add to my nomination list"
			onClick={() => handleToggle()}
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
