import React, { useState, useRef, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
const SignUpForm: React.FC = () => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPwRef = useRef<HTMLInputElement>(null);
	const { signUp, authError, signingUp } = useAuth();

	const handleSubmit = (event: any) => {
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

		setIsLoading(false);
	};

	useEffect(() => {
		if (signingUp && authError) setError(authError);
		return () => {
			setError("");
		};
	}, [authError]);

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
					onBlur={() => setError("")}
					onChange={() => setError("")}
					required
				/>
				<label className="regForm__label">Password</label>
				<input
					className="regForm__input"
					type="password"
					name="password"
					ref={passwordRef}
					onBlur={() => setError("")}
					onChange={() => setError("")}
					required
				/>
				<label className="regForm__label">Confirm Password</label>
				<input
					className="regForm__input"
					type="password"
					name="confirmPw"
					ref={confirmPwRef}
					onBlur={() => setError("")}
					onChange={() => setError("")}
					required
				/>
				<label className="regForm__label">Name</label>
				<input
					className="regForm__input"
					type="text"
					name="userName"
					ref={nameRef}
					onBlur={() => setError("")}
					onChange={() => setError("")}
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
