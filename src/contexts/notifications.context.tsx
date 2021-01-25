import React, { useState, useContext, useReducer, useEffect } from "react";
import { ContextProps } from "./nominationList.context";

interface NotificationsCtxInterface {
	notiContent?: string;
	notiShow?: boolean;
	notiDisabled?: boolean;

	setNotiMessage(message: string): void;
	turnOffNotiWithBtn(): void;
	setNotiDuration(duration: number): void;
}

export const NotificationsContext = React.createContext(
	{} as NotificationsCtxInterface
);

export const useNotification = (): NotificationsCtxInterface => {
	return useContext(NotificationsContext);
};
// notifications reducer

export const NOTI_ACTIONS = {
	NOTI_SHOW: "NOTI_SHOW",
	NOTI_HIDE: "NOTI_HIDE",
	NOTI_DISABLED: "NOTI_DISABLED",
};

type NotiReducerAction =
	| { type: "NOTI_SHOW"; payload: string }
	| { type: "NOTI_HIDE"; payload?: string }
	| { type: "NOTI_DISABLED"; payload?: string };

export interface NotiProps {
	notiContent?: string;
	notiShow: boolean;
	notiDisabled?: boolean;
}
export const notiReducer = (
	state: NotiProps,
	action: NotiReducerAction
): NotiProps => {
	switch (action.type) {
		case NOTI_ACTIONS.NOTI_SHOW:
			return {
				...state,
				notiContent: action.payload,
				notiShow: true,
				notiDisabled: false,
			};
		case NOTI_ACTIONS.NOTI_HIDE:
			return { ...state, notiContent: undefined, notiShow: false };
		case NOTI_ACTIONS.NOTI_DISABLED:
			return {
				...state,
				notiDisabled: true,
				notiContent: undefined,
				notiShow: false,
			};
		default:
			return state;
	}
};

export const NotificationsProvider: React.FC<ContextProps> = ({
	children,
}: ContextProps) => {
	/* ------------- NOTE: steps ------------- */
	// 1. receive noti from reducer
	// 2. show noti
	// 3. hide noti after preset time or
	//		when (x) is clicked
	// 4. clear noti completely

	// const toggle = (): void => {
	// 	setShow(!show);
	// };

	const [notiState, dispatch] = useReducer(notiReducer, {
		notiContent: undefined,
		notiShow: false,
		notiDisabled: true,
	});

	const [duration, setDuration] = useState(1);

	const setNotiMessage = (message: string): void => {

		dispatch({
			type: "NOTI_SHOW",
			payload: message,
		});
	};

	const setNotiDuration = (duration: number): void => {
		setDuration(duration);
	};

	const hideNoti = (): void => {
		setTimeout(() => {
			dispatch({
				type: "NOTI_HIDE",
			});
		}, duration * 1000);
	};

	const disableNoti = (): void => {
		setTimeout(() => {
			dispatch({
				type: "NOTI_DISABLED",
			});
		}, (duration + 1) * 1000);
	};
	const turnOffNotiWithBtn = (): void => {
		return dispatch({
			type: "NOTI_DISABLED",
		});
	};
	useEffect(() => {
		if (notiState.notiContent) {
			setNotiDuration(5);
			hideNoti();
		}
		return () => {
			disableNoti();
		};
	}, [notiState.notiContent]);

	const value = {
		notiContent: notiState.notiContent,
		notiShow: notiState.notiShow,
		notiDisabled: notiState.notiDisabled,
		turnOffNotiWithBtn,
		setNotiMessage,
		setNotiDuration,
	};

	return (
		<NotificationsContext.Provider value={value}>
			{children}
		</NotificationsContext.Provider>
	);
};
