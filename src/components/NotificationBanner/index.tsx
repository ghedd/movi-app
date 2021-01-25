import React from "react"; // useEffect
import "./styles.scss";
import { ReactComponent as XIcon } from "../../assets/icon_x.svg";
import { useNotification } from "../../contexts/notifications.context";

const NotificationBanner: React.FC = () => {
	const {
		notiContent,
		notiShow,
		notiDisabled,
		turnOffNotiWithBtn,
	} = useNotification();

	return (
		<div className="notiBannerWrapper">
			{/* <button
				className="btn"
				onClick={() => {
					handleAnimationEnd();
				}}
			>
				toggle
			</button> */}
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
