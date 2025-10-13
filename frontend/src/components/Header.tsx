import { useState, useEffect } from 'react'
import './Header.css'
import { getApiVersion } from '../Api';

function Header() {

	const [apiVersion, setApiVersion] = useState<string>('...');

	useEffect(() => {
		(async() => {
			const apiInfo: {version:string} = await getApiVersion();
			setApiVersion(apiInfo.version);
		})();
	}, []);

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
