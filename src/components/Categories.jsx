import { useRef, useState, useEffect, memo, useCallback } from 'react';
import CategoriedetailsModal from './CategoriedetailsModal';
import CategoriesCard from './CategoriesCard';
import CategoryPagination from './CategoryPagination';
import LoadingState from './LoadingState';

// Header with search input and static banner
const Header = memo(function Header({ inputValue, onInputChange }) {
	return (
		<div className="categories-header">
			{/* Creates search landmark */}
			{/* Adding role="search", since the search element is not yet fully supported by all commonly used assistive technologies, and browsers */}
			<search
				className="category-search"
				role="search"
				aria-labelledby="search-label"
			>
				<h2 className="category-search__title" id="search-label">
					Characters
				</h2>
				<form className="category-search__form">
					<label htmlFor="search-input-label" hidden>
						Search
					</label>
					<input
						id="search-input-label"
						type="search"
						value={inputValue}
						onChange={onInputChange}
						placeholder="Character Name"
						className="category-search__search-input focus--invert-color"
						aria-controls="search-results-label"
					/>
				</form>
			</search>
			<picture className="card-categories__img-wrapper grid-item__child-full-width">
				<source
					srcSet="/img/rick-and-morty-staring-1440.jpeg"
					media="(min-width: 1200px)"
				/>
				<source
					srcSet="/img/rick-and-morty-staring-900.jpeg"
					media="(min-width: 900px)"
				/>
				<source
					srcSet="/img/rick-and-morty-staring-600.jpeg"
					media="(min-width: 600px)"
				/>
				<img
					src="/img/rick-and-morty-staring-600.jpeg"
					aria-hidden="true"
					className="card-categories__img"
				/>
			</picture>
		</div>
	);
});

export default function Categories({ baseUrl, loadingMessage, errorMessage }) {
	const [categoryData, setCategoryData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPageCount, setCurrentPageCount] = useState(1);
	const [searchInput, setSearchInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const [selectedCardData, setSelectedCardData] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(null);

	const showLoader = loading || isTyping;
	const modalRef = useRef(null);
	const skipLabel = 'skip-items';

	const handleSearchChange = useCallback((e) => {
		setSearchInput(e.target.value);
		setIsTyping(true);
	}, []);

	useEffect(() => {
		const handler = setTimeout(() => {
			setSearchTerm(searchInput);
			setCurrentPageCount(1);
			setIsTyping(false);
		}, 500);
		return () => clearTimeout(handler);
	}, [searchInput]);

	const apiUrl = `${baseUrl}?page=${currentPageCount}${
		searchTerm ? `&name=${encodeURIComponent(searchTerm)}` : ''
	}`;

	const handlePageChange = useCallback((direction) => {
		setCurrentPageCount((count) => count + direction);
	}, []);

	const openModal = useCallback((cardData, index) => {
		setSelectedCardData(cardData);
		setSelectedIndex(index);
		modalRef.current.showModal();
	}, []);

	const closeModal = useCallback(() => {
		// To prevent previous modal data from being displayed when the modal is reopened
		setSelectedCardData(null);
		setSelectedIndex(null);
		modalRef.current.close();
	}, []);

	// Fetch data when apiUrl changes
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(apiUrl);

				if (res.status === 404) {
					// Handle 404 error by setting empty data
					setCategoryData({
						results: [],
						info: { pages: 0, count: 0, next: null, prev: null },
					});
				} else if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				} else {
					const data = await res.json();
					setCategoryData(data);
				}
			} catch (err) {
				console.error('Failed to fetch data:', err);
				setError(err.message || 'Something went wrong');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [apiUrl]);

	if (error)
		return (
			<h2>
				{errorMessage}: {error}
			</h2>
		);

	return (
		<section className="card-categories grid-item">
			<Header inputValue={searchInput} onInputChange={handleSearchChange} />

			<a href="#skip-items" className="visually-hidden skip-link">
				Skip the list
			</a>
			{showLoader ? (
				<LoadingState />
			) : !categoryData || categoryData.results.length === 0 ? (
				<h2>No data available</h2>
			) : (
				<output
					className="card-categories__content-wrapper"
					id="search-results-label"
				>
					<ul className="cards-wrapper">
						<CategoriedetailsModal
							modalRef={modalRef}
							selectedCardData={selectedCardData}
							closeModal={closeModal}
						/>
						{categoryData.results.map((data, index) => (
							<CategoriesCard
								categoryData={data}
								key={data.id}
								openModal={() => openModal(data, index)}
								isModalOpen={selectedIndex === index}
							/>
						))}
					</ul>
					<CategoryPagination
						skipLabel={skipLabel}
						categoryInfo={categoryData.info}
						handlePageChange={handlePageChange}
						currentPageCount={currentPageCount}
					/>
				</output>
			)}
		</section>
	);
}
