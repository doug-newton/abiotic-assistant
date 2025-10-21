import { ReactFlowProvider } from '@xyflow/react'
import './App.css'
import AddItem from './components/AddItem.tsx'
import Header from './components/Header.tsx'
import Plotter from './components/Plotter.tsx'

function App() {

	return (
		<>
			<div id="main">
				<Header />
				<div id="content">
					<ReactFlowProvider>
						<Plotter />
						<AddItem />
					</ReactFlowProvider>
				</div>
			</div>
		</>
	)
}

export default App
