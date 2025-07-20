export default function Hero() {
	return (
		<section className="grid-item">
			<div className="home-hero">
				<h1 className="home-hero__title">
					Is this the first part of some magic trick?
				</h1>
				<p className="home-hero__text">
					“Uh, here's something that's never happened before: I'm a
					pickle.”
				</p>
				<img
					className="home-hero__img"
					src="/svg/im-pick-rick.svg"
					alt={`I'm Pickle Rick!" stylized text in a wavy, cartoonish font.`}
				/>
			</div>
		</section>
	);
}
