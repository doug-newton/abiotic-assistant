import { ReactFlowProvider } from '@xyflow/react'
import './App.css'
import AddItem from './components/AddItem.tsx'
import Header from './components/Header.tsx'
import Plotter from './components/Plotter.tsx'
import DragAndDropProvider from './providers/DragAndDropProvider.tsx'

function App() {

	return (
		<>
			<div id="main">
				<Header />
				<div id="content">
					<ReactFlowProvider>
						<DragAndDropProvider>
							<Plotter />
							<AddItem />
						</DragAndDropProvider>
					</ReactFlowProvider>
				</div>
			</div>
		</>
	)
}

export default App
