import React, { useRef, useState } from "react";
import { useAuth } from "../../context/auth.context";
import "./styles.scss";
const SignInForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const { signIn, authError } = useAuth();

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		if (emailRef.current === null || passwordRef.current === null) return;
		setIsLoading(true);
		signIn(emailRef.current.value, passwordRef.current.value);
		if (authError) setError(authError);
		setIsLoading(false);
	};

	return (
		<div className="regFormCard regForm__signIn">
			<form className="regForm" onSubmit={handleSubmit}>
				<h2 className="regForm__title fontRegForm__title">SIGN IN</h2>
				<h3 className="regForm__subtitle fontRegForm__subtitle">
					Already have an account? Sign in here.
				</h3>
				{error !== "" ? (
					<span className="regForm__error fontRegForm__error">{error}</span>
				) : null}
				<label className="regForm__label" htmlFor="email">
					Email
				</label>
				<input
					className="regForm__input"
					type="email"
					name="email"
					required
					ref={emailRef}
					id="email"
				/>
				<label className="regForm__label" htmlFor="password">
					Password
				</label>
				<input
					className="regForm__input"
					type="password"
					name="password"
					required
					ref={passwordRef}
				/>
				<button
					disabled={isLoading}
					className={`${isLoading ? "btn--disabled" : ""} btn regForm__btn`}
					type="submit"
				>
					submit
				</button>
			</form>
		</div>
	);
};

export default SignInForm;
