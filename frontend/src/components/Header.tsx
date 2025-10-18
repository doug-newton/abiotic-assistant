import './Header.css'
import useStaticApiData from '../hooks/useStaticApiData';

function Header() {

	const { apiVersion } = useStaticApiData();

	return (
		<>
			<div id="header">
				<h1>Abiotic Assistant</h1>
				<div className="version">{apiVersion}</div>
			</div>
		</>
	)
}

export default Header
