//utils
import React from "react";
import "./styles.scss";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
// child components
import HomePage from "./pages/HomePage/index";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import MediaPage from "./pages/MediaPage";
import RegistrationPage from "./pages/RegistrationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
// contexts
import { NominationListPropsProvider } from "./context/nominationList.context";
import { AuthProvider } from "./context/auth.context";

const App: React.FC = () => {
	return (
		<AuthProvider>
			<NominationListPropsProvider>
				<Router>
					<Header />
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/search/:keyword" component={SearchPage} />
						<Route exact path="/item/:id" component={MediaPage} />
						<Route exact path="/profile" component={ProfilePage} />
						<Route exact path="/sign-in" component={RegistrationPage} />
						<Redirect to="/" />
					</Switch>
					<Footer />
				</Router>
			</NominationListPropsProvider>
		</AuthProvider>
	);
};

export default App;
