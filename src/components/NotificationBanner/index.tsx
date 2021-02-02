import React, {
	// useContext
} from "react"; // useEffect // useState,
import "./styles.scss";
import { ReactComponent as XIcon } from "../../assets/icon_x.svg";
import { useNotification } from "../../contexts/notifications.context";
// import { useAuth } from "../../contexts/auth.context";
// import { NominationListCtx } from "../../contexts/nominationList.context";
// import { db } from "../../firebase";

const NotificationBanner: React.FC = () => {
	const {
		notiContent,
		notiShow,
		notiDisabled,
		turnOffNotiWithBtn,
	} = useNotification();
	// const { count } = useContext(NominationListCtx);
	// const { uid, userName } = useAuth();
	// const [userName, setUserName] = useState("");

	/* ----------------- NOTE ---------------- */
	// the following effect is for
	// notifying user's sign-in/sign-out status

	/* --------------------------------------- */

	/* const notifyOnFullNomLis = () => {
		return (
			uid && (
				<div
					className="notiBanner"
					style={{
						animation: `${
							notiShow ? "fadeIn forwards " : "fadeOut"
						} 0.2s ease-in-out`,
						display: `${notiDisabled ? "none" : "grid"}`,
					}}
				>
					<div className="notiBanner__body">
						<p className="notiBanner__content fontNoti">
							🎉{` ${notiContent}, ${userName}!`}
						</p>
					</div>
					<span
						className="notiBanner__closeBtn"
						role="button"
						onClick={() => turnOffNotiWithBtn()}
					>
						<XIcon />
					</span>
				</div>
			)
		);
	}; */

	return (
		<div className="notiBannerWrapper">
			<div
				className="notiBanner"
				style={{
					animation: `${
						notiShow ? "fadeIn forwards " : "fadeOut"
					} 0.2s ease-in-out`,
					display: `${notiDisabled ? "none" : "grid"}`,
				}}
			>
				<div className="notiBanner__body">
					<p className="notiBanner__content fontNoti">{notiContent}</p>
				</div>
				<span
					className="notiBanner__closeBtn"
					role="button"
					onClick={() => turnOffNotiWithBtn()}
				>
					<XIcon />
				</span>
			</div>
		</div>
	);
};

export default NotificationBanner;
