import './App.css'
import Header from './components/Header.tsx'
import Plotter from './components/Plotter.tsx'

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
