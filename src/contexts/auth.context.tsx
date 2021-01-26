import React, { useState, useContext, useEffect, useReducer } from "react";
import { ContextProps } from "./nominationList.context";
import { auth, db } from "../firebase";
import { useNotification } from "./notifications.context";
const AuthContext = React.createContext({} as UserCtxInterface);

export const useAuth = (): UserCtxInterface => {
	return useContext(AuthContext);
};

type User = {
	email: string;
	password: string;
};

interface UserCtxInterface {
	currUser: User | null;
	uid: string;
	isLoading: boolean;
	signingIn: boolean;
	signingUp: boolean;
	loggingOut: boolean;
	signUp: (email: string, password: string, name: string) => void;
	signIn: (email: string, password: string) => void;
	authError: string | undefined;
	authStatus?: string;
	logOut: () => void;
}

/* ----------- NOTE: CONSTANTS ----------- */
export const AUTH_ACTIONS = {
	SIGN_IN_ERROR: "SIGN_IN_ERROR",
	SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
	SIGN_UP_ERROR: "SIGN_UP_ERROR",
	SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
	LOG_OUT_SUCCESS: "LOG_OUT_SUCCESS",
	LOG_OUT_ERROR: "LOG_OUT_ERROR",
};

/* --------------------------------------- */
const initState = {
	authError: undefined,
	authStatus: "",
	authUid: "",
};
type AuthReducerAction = {
	type: string;
	payload?: string | null;
	status?: string | null;
};
export const authReducer = (
	state = initState,
	action: AuthReducerAction
): any => {
	switch (action.type) {
		case AUTH_ACTIONS.SIGN_IN_ERROR:
			// console.log("Error signing in");
			return { ...state, authError: action.payload };
		case AUTH_ACTIONS.SIGN_IN_SUCCESS:
			// console.log("Sign-in success!");
			return { ...state, authError: "", authStatus: action.payload };
		case AUTH_ACTIONS.SIGN_UP_ERROR:
			// console.log("Sign-up failed");
			return { ...state, authError: action.payload };
		case AUTH_ACTIONS.SIGN_UP_SUCCESS:
			return { ...state, authError: "", authStatus: action.payload };
		case AUTH_ACTIONS.LOG_OUT_ERROR:
			return { ...state, authStatus: "", authError: action.payload };
		case AUTH_ACTIONS.LOG_OUT_SUCCESS:
			return { ...state, authError: "", authStatus: action.payload };
		default:
			return state;
	}
};

export const AuthProvider: React.FC<ContextProps> = ({
	children,
}: ContextProps) => {
	const [authState, dispatch] = useReducer(authReducer, initState);
	const [currUser, setCurrUser] = useState(null);
	const [uid, setUid] = useState("");
	const [isLoading, setLoading] = useState(true);
	const [signingIn, setSigningIn] = useState(false);
	const [signingUp, setSigningUp] = useState(false);
	const [loggingOut, setLoggingOut] = useState(false);
	const { setNotiMessage } = useNotification();

	const signUp = (email: string, password: string, name: string): any => {
		setSigningUp(true);
		setSigningIn(false);
		setLoggingOut(false);

		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				const newUser = db
					.collection("users")
					.doc(response.user?.uid)
					.set({
						name: name,
						initial: name.charAt(0),
					});
				return newUser;
			})
			.then(() => {
				dispatch({
					type: AUTH_ACTIONS.SIGN_UP_SUCCESS,
					payload: "You've successfully signed in!",
				});
			})
			.catch((error) => {
				dispatch({
					type: AUTH_ACTIONS.SIGN_IN_ERROR,
					payload: error.message,
				});
			});
	};
	const signIn = async (email: string, password: string) => {
		setSigningUp(false);
		setLoggingOut(false);
		setSigningIn(true);

		const signingIn = await auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				dispatch({
					type: AUTH_ACTIONS.SIGN_IN_SUCCESS,
					payload: "Welcome back",
				});
			})
			.catch((error) => {
				dispatch({
					type: AUTH_ACTIONS.SIGN_IN_ERROR,
					payload: error.message,
				});
			});

		return signingIn;
	};

	const logOut = (): any => {
		setLoggingOut(true);
		setSigningUp(false);
		setSigningIn(false);

		const logingOut = auth
			.signOut()
			.then(() => {
				dispatch({
					type: AUTH_ACTIONS.LOG_OUT_SUCCESS,
					payload: "Successfully logged out. Come back soon!",
				});
			})
			.catch((error) =>
				dispatch({
					type: AUTH_ACTIONS.LOG_OUT_ERROR,
					payload: error.message,
				})
			);
		setTimeout(() => {
			dispatch({
				type: AUTH_ACTIONS.LOG_OUT_ERROR,
				payload: "",
			});
		}, 5_000);
		setUid("");

		return logingOut;
	};

	useEffect(() => {
		const status = authState.authStatus;
		if (status !== "") {
			setNotiMessage(status);
		}
	}, [authState.authStatus]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: any) => {
			setCurrUser(user);
			user && setUid(user.uid);

			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, [uid]);

	// console.log("uid", uid);
	const value = {
		uid,
		currUser,
		signUp,
		signIn,
		logOut,
		signingIn,
		signingUp,
		loggingOut,
		isLoading,
		authError: authState.authError,
		authStatus: authState.authStatus,
	};

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
};
