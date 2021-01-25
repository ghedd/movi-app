//utils
import React from "react";
import "./styles.scss";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import LoadPageFromTop from "./utils/navigateToTop";
// child components
import HomePage from "./pages/HomePage/index";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import MediaPage from "./pages/MediaPage";
import RegistrationPage from "./pages/RegistrationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotificationBanner from "./components/NotificationBanner";

// contexts
import { NominationListProvider } from "./contexts/nominationList.context";
import { AuthProvider } from "./contexts/auth.context";
import { NotificationsProvider } from "./contexts/notifications.context";

const App: React.FC = () => {
	return (
		<NotificationsProvider>
			<AuthProvider>
				<NominationListProvider>
					<Router>
						<LoadPageFromTop />
						<Header />
						<NotificationBanner />
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
				</NominationListProvider>
			</AuthProvider>
		</NotificationsProvider>
	);
};

export default App;
