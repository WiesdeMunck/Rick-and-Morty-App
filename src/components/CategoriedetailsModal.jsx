import ReactDOM from 'react-dom';
export default function CategoriedetailsModal({ modalRef, selectedCardData, closeModal }) {
	const { name, status, species, gender, location, episode, image } =
		selectedCardData || {};

	return ReactDOM.createPortal(
		<dialog
			id="details-modal-label"
			aria-labelledby="details-modal-title"
			ref={modalRef}
			className="details-modal"
		>
			<div className="details-modal__content-wrapper">
				<button
					aria-expanded="true"
					aria-controls="details-modal-label"
					className="details-modal__btn"
					aria-labelledby="close-modal-label"
					onClick={closeModal}
				>
					<img src="/svg/x-icon.svg" alt="x icon, close modal" />
					<span id="close-modal-label" hidden>
						Close Modal
					</span>
				</button>
				<div className="details-modal__content-wrapper">
					<div className="details-modal__body">
						<picture className="details-modal__img-wrapper">
							<img
								src={image}
								alt="placeholder image"
								className="details-modal__img"
							/>
						</picture>
						<h2 className='details-modal__title' id="details-modal-title">{name}</h2>
						<p
							className={`details-modal__text details-modal__text--${status?.toLowerCase()}`}
						>
							{status} - {species}
						</p>
					</div>
					<div className="details-modal__footer">
						<p className="details-modal__footer-text">
							Gender:
							<img
								className="details-modal__footer-icon"
								src={`/svg/${gender?.toLowerCase()}-gender-icon.svg`}
								alt={`Gender ${gender} icon`}
							/>
							{gender}
						</p>

						<p className="details-modal__footer-text">
							Last seen Location: {location?.name}
						</p>
						<p className="details-modal__footer-text">
							Number of episodes: {episode?.length}
						</p>
					</div>
				</div>
			</div>
		</dialog>,
		document.getElementById('details-modal')
	);
}
