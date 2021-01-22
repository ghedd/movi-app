import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const LoadPageFromTop = ({ history }: any): any => {
	useEffect(() => {
		const unlisten = history.listen(() => {
			window.scrollTo(0, 0);
		});
		return () => {
			unlisten();
		};
	}, []);

	return null;
};

export default withRouter(LoadPageFromTop);
