import React, { useState, useContext, useEffect } from "react";
import { ContextProps } from "./nominationList.context";
import { auth } from "../firebase";
const AuthContext = React.createContext({} as UserCtxInterface);

export const useAuth = (): UserCtxInterface => {
	return useContext(AuthContext);
};

type User = {
	email: string;
	password: string;
};

interface UserCtxInterface {
	currUser?: User;
	signUp: (email: string, password: string) => void;
	signIn: (email: string, password: string) => void;
	logOut: () => void;
}

export const AuthProvider: React.FC<ContextProps> = ({
	children,
}: ContextProps) => {
	const [currUser, setCurrUser] = useState(Object);
	const [isLoading, setIsLoading] = useState(true);
	console.log(setCurrUser);

	const signUp = (email: string, password: string): any => {
		return auth.createUserWithEmailAndPassword(email, password);
	};
	const signIn = (email: string, password: string): any => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	const logOut = (): any => {
		return auth.signOut();
	};
	useEffect(() => {
		currUser
			? localStorage.setItem(
					"localCurrUserEmail",
					JSON.stringify(currUser.email))
			: "";
	}, [currUser?.email]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: any) => {
			setCurrUser(user);
			setIsLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currUser,
		signUp,
		signIn,
		logOut,
	};

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
};
