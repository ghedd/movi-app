import { useState, useEffect } from "react";

interface WindowSizeProps {
	windowWidth: number | undefined;
}

const useWindowResize = (): WindowSizeProps => {
	const [windowWidth, setWidth] = useState<number | undefined>(undefined);

	const handleResize = (): void => {
		setWidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return { windowWidth };
};

export default useWindowResize;
