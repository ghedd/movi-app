import React, { useContext } from "react";
import "./styles.scss";
import ItemList from "../ItemList";
import { NominationListCtx } from "../../contexts/nominationList.context";

// NOTE this is temporary data only

const NominationSection: React.FC = () => {
	const { items, count } = useContext(NominationListCtx);
	return (
		<div className="mediaSection">
			<h2 className="mediaSectionList fontMediaSection">
				your nomination list - {count}/5
			</h2>
			<ItemList mediaList={items} isNLBlank={count === 0} />
		</div>
	);
};

export default NominationSection;
