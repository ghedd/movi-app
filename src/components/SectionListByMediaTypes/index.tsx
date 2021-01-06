import React from "react";
import "./styles.scss";
// import ItemList from "../ItemList";
interface mediaTypeProps {
	listName: string;
}
const SectionListByMediaTypes: React.FC<mediaTypeProps> = ({
	listName,
}: mediaTypeProps) => {
	return (
		<div className="mediaSection">
			<h2 className="mediaSectionList fontMediaSection">{listName}</h2>
			{/* <ItemList /> */}
		</div>
	);
};

export default SectionListByMediaTypes;
