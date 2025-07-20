import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import CharactersPage from './pages/CharactersPage';
import LocationsPage from './pages/LocationsPage';
import EpisodesPage from './pages/EpisodesPage';

function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			{/* This div is used to render the details modal */}
			<div id="details-modal"></div>
			<Router>
				<Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
				<Routes>
					<Route path="/" element={<Navigate to="/characters" replace />} />
					<Route path="/characters" element={<CharactersPage menuOpen={menuOpen} />} />
					<Route path="/Locations" element={<LocationsPage menuOpen={menuOpen} />} />
					<Route path="/Episodes" element={<EpisodesPage menuOpen={menuOpen} />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
