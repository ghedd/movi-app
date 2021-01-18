import React from "react";
import "./styles.scss";
import bgrImg from "../../assets/the-shire.jpg";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";
import { useAuth } from "../../context/auth.context";
import { Redirect } from "react-router-dom";

const RegistrationPage: React.FC = () => {
	const { currUser } = useAuth();
	console.log("usemail: " + currUser?.email);

	if (currUser) return <Redirect to="/" />;
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
