import './App.css'
import Header from './Header.tsx'
import Plotter from './Plotter.tsx'

function App() {

	return (
		<>
			<div id="main">
				<Header/>
				<div id="content">
					<Plotter/>
				</div>
			</div>
		</>
	)
}

export default App
