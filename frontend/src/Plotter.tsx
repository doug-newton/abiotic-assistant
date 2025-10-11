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

import { initialNodes, initialEdges } from './InitialState.contants';

import '@xyflow/react/dist/style.css';

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
