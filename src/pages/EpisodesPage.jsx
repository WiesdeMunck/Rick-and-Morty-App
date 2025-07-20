import Emptypage from '../components/EmptyPage';
import useIsWidthUnder from '../hooks/useIsWidthUnder';

export default function EpisodesPage({ menuOpen }) {
	// this is set to 900px, becasue we are styling this on for-tablet-l-up media query which is 900px
	const mobileMenu = useIsWidthUnder(900);
	const shouldBeInert = menuOpen && mobileMenu;

	return (
		// Sets inert to true so the rest of the page cant be accessed by screen readers or other assistive technologies
		// React does not support inert natively atm, so we use a prop to conditionally apply it
		<main
			className="category-page"
			{...(shouldBeInert ? { inert: 'true' } : {})}
		>
		 <Emptypage/>
		</main>
	);
}
