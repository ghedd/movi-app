import React from "react";
import "./styles.scss";
const SignInForm: React.FC = () => {
	return (
		<div className="regFormCard regForm__signIn">
			<form className="regForm">
				<h2 className="regForm__title fontRegForm__title">SIGN IN</h2>
				<h3 className="regForm__subtitle fontRegForm__subtitle">
					Already have an account? Sign in here.
				</h3>
				<label className="regForm__label" htmlFor="email">
					Email
				</label>
				<input className="regForm__input" type="email" name="email" />
				<label className="regForm__label" htmlFor="password">
					Password
				</label>
				<input className="regForm__input" type="password" name="password" />
				<button className="btn regForm__btn">submit</button>
			</form>
		</div>
	);
};

export default SignInForm;
