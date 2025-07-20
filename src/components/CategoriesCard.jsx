export default function CategoriesCard({ categoryData, openModal, isModalOpen }) {
	const { image, name, species, status } = categoryData;

	return (
		<>
			<li className="category-card">
				{/* TODO: Make this clickble and still accesible
						 https://css-tricks.com/block-links-the-search-for-a-perfect-solution/
						 https://design-system.w3.org/components/cards.html
						  */}
				<picture className="category-card__img-wrapper">
					<img
						className="category-card__img"
						src={`${image}`}
						alt={`Image of ${name}`}
					/>
				</picture>
				<div className="category-card__content">
					<h3 className="category-card__title">{name}</h3>
					<p
						className={`category-card__text category-card__text--${status.toLowerCase()}`}
					>
						{status} - {species}
					</p>

				<button
					aria-controls="details-modal-label"
					aria-expanded={isModalOpen ? 'true' : 'false'}
					className="category-card__btn"
					onClick={openModal}
				>
					Details
					<img
						className="category-card__chevron"
						src="/svg/chevron-pointing-right.svg"
						alt=""
					/>
				</button>
				</div>
			</li>
		</>
	);
}
