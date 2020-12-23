//utils
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// child components
import HomePage from "./pages/HomePage/index";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";

const App: React.FC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/search" component={SearchPage} />
				<Route exact path="/item/:id" component={MoviePage} />
				<Route exact path="/profile" component={ProfilePage} />
				<Route exact path="/registration" component={RegistrationPage} />
			</Switch>
		</Router>
	);
};

export default App;
