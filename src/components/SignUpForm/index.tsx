import React, { useState, useRef } from "react";
// import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
const SignUpForm: React.FC = () => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPwRef = useRef<HTMLInputElement>(null);
	const { signUp, authError } = useAuth();

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		if (
			!emailRef.current ||
			!passwordRef.current ||
			!confirmPwRef.current ||
			!nameRef.current
		)
			return;

		if (passwordRef.current.value !== confirmPwRef.current.value)
			return setError("Passwords do not match.");

		setIsLoading(true);
		signUp(
			emailRef.current.value,
			passwordRef.current.value,
			nameRef.current.value
		);
		if (authError) setError(authError);

		setIsLoading(false);
	};

	return (
		<div className="regFormCard regForm__signUp">
			<form className="regForm" onSubmit={handleSubmit}>
				<h2 className="regForm__title fontRegForm__title">SIGN UP</h2>
				<h3 className="regForm__subtitle fontRegForm__subtitle">
					New here? Sign up now.
				</h3>
				{error !== "" && (
					<span className="regForm__error fontRegForm__error">{error}</span>
				)}
				<label className="regForm__label">Email</label>
				<input
					className="regForm__input"
					type="email"
					name="email"
					ref={emailRef}
					required
				/>
				<label className="regForm__label">Password</label>
				<input
					className="regForm__input"
					type="password"
					name="password"
					ref={passwordRef}
					required
				/>
				<label className="regForm__label">Confirm Password</label>
				<input
					className="regForm__input"
					type="password"
					name="confirmPw"
					ref={confirmPwRef}
					required
				/>
				<label className="regForm__label">Name</label>
				<input
					className="regForm__input"
					type="text"
					name="userName"
					ref={nameRef}
					required
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

export default SignUpForm;
