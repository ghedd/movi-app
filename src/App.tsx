//utils
import React from "react";
import "./styles.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// child components
import HomePage from "./pages/HomePage/index";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import MediaPage from "./pages/MediaPage";
import RegistrationPage from "./pages/RegistrationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {

	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/search/:keyword" component={SearchPage} />
				<Route exact path="/item/:id" component={MediaPage} />
				<Route exact path="/profile" component={ProfilePage} />
				<Route exact path="/registration" component={RegistrationPage} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
