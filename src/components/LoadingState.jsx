export default function LoadingState() {
	const mockArray = Array.from({ length: 20 }, (_, index) => index + 1);

	return (

				<ul className="cards-wrapper">
					{/* TODO: Loading state only shows 4 cards instead of 5 bug */}
					{mockArray.map((_, index) => (
						<li className="loading-card" key={index}>


						</li>
					))}
				</ul>

	);
}
