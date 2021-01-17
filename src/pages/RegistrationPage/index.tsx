import React from "react";
import "./styles.scss";
import bgrImg from "../../assets/the-shire.jpg";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";

const RegistrationPage: React.FC = () => {
	return (
		<div className="page regPage">
			<div className="regPage__deco">
				<div className="backgroundImage">
					<img loading="lazy" src={bgrImg} alt="the shire" />
				</div>
			</div>
			<div className="regPage__formWrapper">
				<SignInForm />
				<span className="regPage__formDivider">OR</span>
				<SignUpForm />
			</div>
		</div>
	);
};

export default RegistrationPage;
