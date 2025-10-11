import { useState, useEffect } from 'react'
import './Header.css'

const API_URL = import.meta.env.VITE_API_URL;

function Header() {

	const [apiVersion, setApiVersion] = useState(null);

	useEffect(() => {
		async function getApiVersion() {
			const url = `${API_URL}/v`;
			console.log(url);
			const response = await fetch(url);
			const json = await response.json();
			setApiVersion(json.version);
		}
		getApiVersion();
	}, []);

	return (
		<>
		<div id="header">
			<h1>Abiotic Assistant</h1>
			{
				apiVersion == null ?
				(	
					<div className="version">...</div>
				) : 
					<div className="version">{apiVersion}</div>
			}
		</div>
		</>
	)
}

export default Header
