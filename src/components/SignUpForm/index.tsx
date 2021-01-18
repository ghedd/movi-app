import React, { useState, useRef } from "react";
// import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
const SignUpForm: React.FC = () => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPwRef = useRef<HTMLInputElement>(null);
	const { signUp } = useAuth();

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		if (
			emailRef.current === null ||
			passwordRef.current === null ||
			confirmPwRef.current === null
		)
			return setError("Error");

		if (passwordRef.current.value !== confirmPwRef.current.value)
			return setError("Passwords do not match.");

		if (passwordRef.current.value.length < 6)
			return setError("Password must be at least 6 characters long.");

		try {
			setError("");
			setIsLoading(true);
			await signUp(emailRef.current.value, passwordRef.current.value);
		} catch {
			setError("Failed to create an account");
			setIsSuccess(false);
		}
		setIsLoading(false);
	};

	return (
		<>
			{isSuccess ? (
				<h1>SUCCESS</h1>
			) : (
				<div className="regFormCard regForm__signUp">
					<form className="regForm" onSubmit={handleSubmit}>
						<h2 className="regForm__title fontRegForm__title">SIGN UP</h2>
						<h3 className="regForm__subtitle fontRegForm__subtitle">
							New here? Sign up now.
							{error !== "" ? (
								<span className="regForm__error fontRegForm__error">
									{error}
								</span>
							) : null}
						</h3>
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
						<button
							disabled={isLoading}
							className={`${isLoading ? "btn--disabled" : ""} btn regForm__btn`}
							type="submit"
						>
							submit
						</button>
					</form>
				</div>
			)}
		</>
	);
};

export default SignUpForm;
