import React, { useContext } from "react";
import "./styles.scss";
import { ReactComponent as NominationIcon } from "../../assets/icon_add-nomination.svg";
import {
	NominationListCtx,
	// NominationListCtxInterface,
} from "../../context/nominationList.context";

const NominationCounter: React.FC = () => {
	const counter = useContext(NominationListCtx);
	console.log("context:" + counter.count);

	return (
		<li className="navItem nominationCounter">
			<NominationIcon className="nominationCounter__icon" />
			<span>{counter.count}/5 </span>
		</li>
	);
};

export default NominationCounter;
