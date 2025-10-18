import { ReactFlow, Background, Controls, Panel, useNodesState, useEdgesState, } from '@xyflow/react';
import AddItem from './AddItem';
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
			<Panel position="top-right">
				<AddItem/>
			</Panel>
			<Background/>
			<Controls/>
		</ReactFlow>
	);
}
