import React, { useState, useEffect } from "react"; // useEffect
import "./styles.scss";
import { ReactComponent as XIcon } from "../../assets/icon_x.svg";
import { useNotification } from "../../contexts/notifications.context";
import { useAuth } from "../../contexts/auth.context";
import { db } from "../../firebase";

const NotificationBanner: React.FC = () => {
	const {
		notiContent,
		notiShow,
		notiDisabled,
		turnOffNotiWithBtn,
	} = useNotification();

	const { uid, authStatus, signingIn } = useAuth();
	const [userName, setUserName] = useState("");

	/* ----------------- NOTE ---------------- */
	// the following effect is for
	// notifying user's sign-in/sign-out status

	useEffect(() => {
		if (uid) {
			const userDoc = db.collection("users").doc(`${uid}`);
			userDoc
				.get()
				.then((doc) => {
					if (doc.exists) {
						const userRef = doc.data();
						userRef && setUserName(userRef.name);
					}
				})
				.catch((error) => console.log(error));
		}
	}, [uid]);
	/* --------------------------------------- */

	const notifyOnFullNomLis = () => {
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
							{`${notiContent}, ${userName}!`}
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
	};

	return (
		<div className="notiBannerWrapper">
			{signingIn && authStatus !== "" ? (
				notifyOnFullNomLis()
			) : (
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
			)}
		</div>
	);
};

export default NotificationBanner;
