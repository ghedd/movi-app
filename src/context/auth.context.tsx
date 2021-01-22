import React, { useState, useContext, useEffect, useReducer } from "react";
import { ContextProps } from "./nominationList.context";
import { auth, db } from "../firebase";
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
	signUp: (email: string, password: string, name: string) => void;
	signIn: (email: string, password: string) => void;
	authError: string | undefined;
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
interface Action {
	type: string;
	payload?: string | null;
	status?: string | null;
}
export const authReducer = (state = initState, action: Action): any => {
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
	const [isLoading, setIsLoading] = useState(true);

	const signUp = (email: string, password: string, name: string): any => {
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
			.catch((error) => {
				dispatch({
					type: AUTH_ACTIONS.SIGN_IN_ERROR,
					payload: error.message,
				});
			});
	};
	const signIn = (email: string, password: string): any => {
		// setAuthError("");
		const signingIn = auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				dispatch({
					type: AUTH_ACTIONS.SIGN_IN_SUCCESS,
					payload: "Successfully signed in.",
				});
			})
			.catch((error) => {
				dispatch({
					type: AUTH_ACTIONS.SIGN_IN_ERROR,
					payload: error.message,
				});
				// setTimeout(() => {
				// 	dispatch({
				// 		type: AUTH_ACTIONS.SIGN_IN_ERROR,
				// 		payload: "",
				// 	});
				// }, 10000);
			});
		return signingIn;
	};

	const logOut = (): any => {
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
		}, 10000);
		setUid("");

		return logingOut;
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: any) => {
			setCurrUser(user);
			user && setUid(user.uid);

			setIsLoading(false);
		});

		return () => {
			unsubscribe;
		};
	}, [uid]);

	console.log("uid", uid);
	const value = {
		uid,
		currUser,
		signUp,
		signIn,
		logOut,
		authError: authState.authError,
		authStatus: authState.authStatus,
	};

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
};
