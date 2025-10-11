import { useState, useCallback } from 'react'
import {
	ReactFlow,
	Background,
	Controls,
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
} from '@xyflow/react';

import type { Node, Edge, NodeChange, EdgeChange, Connection } from '@xyflow/react'

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
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

const initialEdges: Edge[] = [];

export default function Plotter() {

	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodesChange = useCallback(
		(changes:NodeChange<Node>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[]
	);

	const onEdgesChange = useCallback(
		(changes:EdgeChange<Edge>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[]
	);

	const onConnect = useCallback(
		(connection: Connection) => setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot)),
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
