import React, { useState } from "react";
import "./styles.scss";

import { ReactComponent as AwardIcon } from "../../assets/icon_add-nomination.svg";
const AddToNominationListButton: React.FC = () => {
	/* ----------------- TODO ---------------- */
	// [ ] create optional flexible tooltip
	/* --------------------------------------- */

	const [isAdded, setIsAdded] = useState<boolean>(false);

	const handleToggle = (): void => {
		setIsAdded(!isAdded);
		console.log(isAdded);
	};

	return (
		<button
			className="btn addNominationBtn"
			type="button"
			aria-label="Add to my nomination list"
			onClick={() => handleToggle()}
			data-added={isAdded}
		>
			<AwardIcon
				className={` addNominationBtn__icon ${
					isAdded ? "addNominationBtn__icon--added" : ""
				}`}
			/>
		</button>
	);
};

export default AddToNominationListButton;
