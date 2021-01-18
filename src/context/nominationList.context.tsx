import React, { useState, useEffect } from "react";
import { MediaItemProps } from "../components/MediaItem";
import { useAuth } from "./auth.context";

// NOTE: generic type props for
// react children components
export type ContextProps = {
	children?: React.ReactNode;
	// [key: string]: any;
};

export interface NominationListCtxInterface {
	count: number;
	// isFull: boolean;
	items: MediaItemProps[];
	addItemToNominationList: (item: any) => void;
	removeItemFromNominationList: (imdbID: string) => void;
}

export const NominationListCtx = React.createContext(
	{} as NominationListCtxInterface
);

export const NominationListPropsProvider: React.FC<ContextProps> = ({
	children,
}: ContextProps) => {
	const { currUser } = useAuth();
	const localData = localStorage.getItem("nominationList");
	const initState = localData && currUser ? JSON.parse(localData) : [];
	const [count, setCount] = useState(initState.length);
	// const [isFull] = useState(false);
	const [items, setItems] = useState<MediaItemProps[]>(initState);

	useEffect(() => {
		localStorage.setItem("nominationList", JSON.stringify(items));
	}, [items]);

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
			setCount(count + 1);
			if (count === 5) {
				setItems([...items]);
			}
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
				// isFull,
				items,
				addItemToNominationList,
				removeItemFromNominationList,
			}}
		>
			{children}
		</NominationListCtx.Provider>
	);
};
