import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL;

function App() {

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
		<h1>Abiotic Assistant</h1>
		{ 
			apiVersion == null ? 
				(<p>loading</p>) 
			: (
				<p>API Version: {apiVersion}</p>
			) 
		}
		</>
	)
}

export default App
