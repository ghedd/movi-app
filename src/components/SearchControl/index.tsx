import React from "react";
import "./styles.scss";
interface SearchControlProps {
	isLoading: boolean;
	moreResults(): void;
}

const SearchControl: React.FC<SearchControlProps> = ({
	moreResults,
	isLoading,
}: SearchControlProps) => {
	return (
		<div className="searchControl">
			<button
				className={`${
					isLoading ? "btnSearchControl--isLoading" : ""
				} btn btnSearchControl`}
				disabled={isLoading}
				onClick={moreResults}
			>
				{isLoading ? (
					<div className="loadingDots">
						<span className="loadingDot loadingDot--1"></span>
						<span className="loadingDot loadingDot--2"></span>
						<span className="loadingDot loadingDot--3"></span>
					</div>
				) : (
					<span className="moreResults">more results</span>
				)}
			</button>
			<button
				className="btn btn--secondary btnSearchControl btnBackToTop "
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				back to top
			</button>
		</div>
	);
};

export default SearchControl;
