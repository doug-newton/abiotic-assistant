import { useState, useCallback } from 'react'
import {
	ReactFlow,
	Background,
	Controls,
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
	Panel,
} from '@xyflow/react';

import type { Node, Edge, NodeChange, EdgeChange, Connection, NodeTypes } from '@xyflow/react'

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

import '@xyflow/react/dist/style.css';

import ItemNode from '../nodes/ItemNode';
import AddItem from './AddItem';

const nodeTypes: NodeTypes = {
	itemNode: ItemNode
};

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
			nodeTypes = {nodeTypes}
			nodes = {nodes}
			edges = {edges}
			onNodesChange = {onNodesChange}
			onEdgesChange = {onEdgesChange}
			onConnect = {onConnect}
			fitView
		>
			<Panel position="top-right">
				<AddItem/>
			</Panel>
			<Background/>
			<Controls/>
		</ReactFlow>
	);
}
