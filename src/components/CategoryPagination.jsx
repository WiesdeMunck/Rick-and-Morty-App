export default function CategoryPagination({
	handlePageChange,
	skipLabel,
	currentPageCount,
	categoryInfo
}) {
	const { count, prev, next } = categoryInfo;


	return (
		<div className="pagination-wrapper">
			<span id={skipLabel}></span>
			{/* TODO: Make these buttons into components */}
			<button
				className="pagination-btn focus--invert-color"
				onClick={() => handlePageChange(-1)}
				aria-labelledby="pagination-previous-btn"
				disabled={!prev}
			>
				<img src="/svg/chevron-pointing-left.svg" alt="" />
				<span id="pagination-previous-btn" hidden>
					previous
				</span>
			</button>
			<button
				className="pagination-btn focus--invert-color"
				onClick={() => handlePageChange(1)}
				aria-labelledby="pagination-next-btn"
				disabled={!next}
			>
				<img src="/svg/chevron-pointing-right.svg" alt="" />
				<span id="pagination-next-btn" hidden>
					next
				</span>
			</button>
			<p className="pagination-wrapper__count">
				{currentPageCount} of {count}
			</p>
		</div>
	);
}
