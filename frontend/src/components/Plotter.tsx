import { ReactFlow, Background, Controls, useNodesState, useEdgesState, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '../types/node.types';

export default function Plotter() {

	const [nodes, , onNodesChange] = useNodesState([]);
	const [edges, , onEdgesChange] = useEdgesState([]);

	return (
		<ReactFlow
			colorMode = 'dark'
			nodeTypes = {nodeTypes}
			nodes = {nodes}
			edges = {edges}
			onNodesChange = {onNodesChange}
			onEdgesChange = {onEdgesChange}
			fitView
		>
			<Background/>
			<Controls/>
		</ReactFlow>
	);
}
