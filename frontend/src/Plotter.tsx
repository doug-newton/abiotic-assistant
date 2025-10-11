import { useState, useEffect, useCallback } from 'react'
import {
	ReactFlow,
	Background,
	Controls,
	applyEdgeChanges,
	applyNodeChanges,
	addEdge
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
	{
		id: 'n1',
		position: { x: 0, y: -50 },
		data: { label: 'Node 1' },
		type: 'input'
	},
	{
		id: 'n2',
		position: { x: 0, y: 50 },
		data: { label: 'Node 2' }
	}
];

const initialEdges = [];

export default function Plotter() {

	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodesChange = useCallback(
		(changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[]
	);

	const onEdgesChange = useCallback(
		(changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[]
	);

	const onConnect = useCallback(
		(params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[]
	);

	return (
		<ReactFlow
			colorMode = 'dark'
			nodes = {nodes}
			edges = {edges}
			onNodesChange = {onNodesChange}
			onEdgesChange = {onEdgesChange}
			onConnect = {onConnect}
			fitView
		>
			<Background/>
			<Controls/>
		</ReactFlow>
	);
}
