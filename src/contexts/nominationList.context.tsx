import React, { useState, useEffect } from "react";
import { MediaItemProps } from "../components/MediaItem";
import { useAuth } from "./auth.context";
import { db } from "../firebase";
import { useNotification } from "./notifications.context";
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

export const NominationListProvider: React.FC<ContextProps> = ({
	children,
}: ContextProps) => {
	const { uid } = useAuth();
	const { setNotiMessage } = useNotification();
	const [items, setItems] = useState<MediaItemProps[] | any>([]);
	const [count, setCount] = useState(0);
	// show notification
	const tada = 127881;
	const tadaEmoj = String.fromCodePoint( tada );
	useEffect(() => {
		let unsubscribe = (): void => {
			// unsubscribe firestore as soon as
			// data has been updated
		};

		if (uid) {
			unsubscribe = db
				.collection(`/usersNominationList/${uid}/nominationList`)
				.onSnapshot(
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
		}
		// clear context as
		// signing out
		return () => {
			setItems([]);
			setCount(0);
			unsubscribe();
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
		}
		if (count === 4) {
			setNotiMessage(`${tadaEmoj} Hoorray! You've got a full list of 5 nominees!`);
		}
	};

	const removeItemFromNominationList = (imdbID: string) => {
		if (count === 0) return;

		// NOTE: array.prototype.filter()
		// ALWAYS returns an array
		const itemToBeDel = items.filter((item: any) => {
			return item.imdbID === imdbID;
		})[0];

		// remove an item (doc) from firebase
		db.collection(`/usersNominationList/${uid}/nominationList`)
			.doc(itemToBeDel.id)
			.delete()
			// .then(() => console.log("Item succesfully deleted"))
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
