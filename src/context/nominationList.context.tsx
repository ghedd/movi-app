import React, { useState } from "react";
import { MediaItemProps } from "../components/MediaItem";

// NOTE: generic type props for
// react children components
type Props = {
	children?: React.ReactNode;
	// [key: string]: any;
};

export interface NominationListCtxInterface {
	count: number;
	isFull: boolean;
	items: MediaItemProps[];
	addItemToNominationList: (item: any) => void;
	removeItemFromNominationList: (imdbID: string) => void;
}

export const NominationListCtx = React.createContext(
	{} as NominationListCtxInterface
);

export const NominationListPropsProvider: React.FC<Props> = ({
	children,
}: Props) => {
	const [count, setCount] = useState(0);
	const [isFull] = useState(false);
	const [items, setItems] = useState<MediaItemProps[]>([]);

	const duplicateCheck = (
		itemArray: MediaItemProps[],
		newItem: MediaItemProps
	) => {
		const dup = itemArray.filter((item) => {
			return item.imdbID === newItem.imdbID;
		});
		return dup;
	};
	const addItemToNominationList = (item: any) => {
		// check for dup
		const dup = duplicateCheck(items, item);
		if (dup.length === 0) {
			setItems([...items, item]);
			if (count === 5) return;
			setCount(count + 1);
		}
	};
	console.log("item: " + items);

	const removeItemFromNominationList = (imdbID: string) => {
		if (count === 0) return;
		const updatedItems = items.filter((item) => {
			return item.imdbID !== imdbID;
		});
		setItems(updatedItems);
		setCount(count - 1);
	};
	return (
		<NominationListCtx.Provider
			value={{
				count,
				isFull,
				items,
				addItemToNominationList,
				removeItemFromNominationList,
			}}
		>
			{children}
		</NominationListCtx.Provider>
	);
};
