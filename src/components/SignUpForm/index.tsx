import React from "react";

const SignUpForm: React.FC = () => {
	return (
		<div className="regFormCard regForm__signUp">
			<form className="regForm">
				<h2 className="regForm__title fontRegForm__title">SIGN UP</h2>
				<h3 className="regForm__subtitle fontRegForm__subtitle">
					New here? Sign up now.
				</h3>
				<label className="regForm__label" htmlFor="userName">
					Name
				</label>
				<input className="regForm__input" type="text" name="userName" />
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

export default SignUpForm;
