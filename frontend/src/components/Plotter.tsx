import { ReactFlow, Background, Controls, Panel, useNodesState, useEdgesState, } from '@xyflow/react';
import type { NodeTypes } from '@xyflow/react'
import ItemNode from '../nodes/ItemNode';
import AddItem from './AddItem';
import '@xyflow/react/dist/style.css';

const nodeTypes: NodeTypes = {
	itemNode: ItemNode
};

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
