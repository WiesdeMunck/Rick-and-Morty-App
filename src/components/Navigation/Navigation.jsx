import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Navigation({ menuOpen, setMenuOpen }) {
	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const location = useLocation();
	const currentPath = location.pathname;

	const links = [
		// TODO: keeping this with only a / instead if characters would be inconsistent and annoying
		{ to: '/Characters', label: 'Characters' },
		{ to: '/locations', label: 'Locations' },
		{ to: '/episodes', label: 'Episodes' },
	];

	return (
		<header className="header">
			<div className="header__wrapper grid-item">
				{/* TODO: add things like aria controls and other forgotten atributen :/ */}
				<nav
					className={`site-nav${menuOpen ? ' menu-open' : ''}`}
					aria-labelledby="site-navigation-label"
					id='site-navigation'
				>
					<span id="site-navigation-label" hidden>
						site
					</span>
					<div className='site-nav__logo-wrapper'>
						<Link to="/" className="site-nav__logo">
							<img
								src="/svg/ricks-face-logo.svg"
								alt="Rick making humorous, exaggerated expression"
							/>
							<span className="visually-hidden">link to home page</span>
						</Link>

						<button
							aria-expanded={menuOpen}
							className="site-nav__hambuger-btn"
							onClick={toggleMenu}
							aria-controls='site-navigation'
							aria-labelledby='menu-label'
						>
							<svg className='site-nav__hamburger-svg' xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none"><rect width="32" height="4" rx="2" fill="#002012"></rect><rect y="12" width="32" height="4" rx="2" fill="#002012"></rect><rect y="24" width="32" height="4" rx="2" fill="#002012"></rect></svg>
							<span id="menu-label" hidden>
								Menu
							</span>
						</button>
					</div>
					<ul className="site-nav__list">
						{links.map((link) => (
							<li className="site-nav__item" key={link.to}>
								<NavLink
									to={link.to}
									className={`site-nav__link`}
									aria-current={
										link.to === currentPath ? 'page' : undefined
									}
									onClick={() => toggleMenu()}
								>
									{link.label}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
