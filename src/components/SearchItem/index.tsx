import React from "react";
import "./styles.scss";

import posterMock from "../../assets/the-shire-2.png";
import ButtonAddToNominationList from "../ButtonAddToNominationList";

const SearchItem: React.FC = () => {
	return (
		<div className="searchItem">
			<div className="searchItem__poster">
				<img src={posterMock} alt="poster" />
			</div>
			<div className="searchItem__brief">
				<span className="searchItem__brief__title fontMediaItem__title">
					Title
				</span>
				<span className="searchItem__brief__year fontMediaItem__year">
					20xx
				</span>
			</div>
			<ButtonAddToNominationList />
		</div>
	);
};

export default SearchItem;
