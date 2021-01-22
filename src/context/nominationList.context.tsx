import React, { useState, useEffect } from "react";
import { MediaItemProps } from "../components/MediaItem";
import { useAuth } from "./auth.context";
import { db } from "../firebase";
// NOTE: generic type props for
// react children components
export type ContextProps = {
	children?: React.ReactNode;
	// [key: string]: any;
};

export interface NominationListCtxInterface {
	count: number;
	// isFull: boolean;
	items: MediaItemProps[] | any;
	addItemToNominationList: (item: any) => void;
	removeItemFromNominationList: (imdbID: string) => void;
}

export const NominationListCtx = React.createContext(
	{} as NominationListCtxInterface
);

export const NominationListPropsProvider: React.FC<ContextProps> = ({
	children,
}: ContextProps) => {
	const { currUser, uid } = useAuth();
	console.log(currUser?.email);

	// const localData = localStorage.getItem("nominationList");
	// const initState = localData && currUser ? JSON.parse(localData) : [];
	const [items, setItems] = useState<MediaItemProps[] | any>([]);
	const [count, setCount] = useState(0);
	// const [isFull] = useState(false);

	useEffect(() => {
		let unsubscribe: any;

		// retrieve data from firebase
		uid &&
			db.collection(`/usersNominationList/${uid}/nominationList`).onSnapshot(
				(snapshot) => {
					const list = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					setItems(list);
					setCount(list.length);
				},
				(error) => {
					console.log(error.message);
				}
			);
		// clear context as
		// signing out
		setItems([]);
		setCount(0);
		return () => {
			unsubscribe;
		};
	}, [uid]);

	const duplicateCheck = (
		itemArray: MediaItemProps[],
		newItem: MediaItemProps
	) => {
		const dup = itemArray.filter((item) => {
			return item.imdbID === newItem.imdbID;
		});
		return dup;
	};
	const addItemToNominationList = (item: MediaItemProps) => {
		// check for dup
		const dup = duplicateCheck(items, item);
		if (dup.length === 0) {
			// setItems([...items, item]);
			db.collection(`/usersNominationList/${uid}/nominationList`).add({
				mediaTitle: item.mediaTitle,
				imdbID: item.imdbID,
				mediaYearOfProd: item.mediaYearOfProd,
				mediaPoster: item.mediaPoster,
				mediaType: "movie",
			});
			setCount(items.length);
			if (count === 5) return;
		}
	};
	console.log("item: " + items);

	const removeItemFromNominationList = (imdbID: string) => {
		if (count === 0) return;
		/* const updatedItems = items.filter((item: any) => {
			return item.imdbID !== imdbID;
		}); 
		*/

		// setItems(updatedItems);
		// NOTE: array.prototype.filter()
		// ALWAYS returns an array
		const itemToBeDel = Object.assign(
			items.filter((item: any) => {
				return item.imdbID === imdbID;
			})[0]
		);

		// remove an item (doc) from firebase
		db.collection(`/usersNominationList/${uid}/nominationList`)
			.doc(itemToBeDel.id)
			.delete()
			.then(() => console.log("Item succesfully deleted"))
			.catch((error) => console.log("Error removing document:", error));
		setCount(items.length);
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
