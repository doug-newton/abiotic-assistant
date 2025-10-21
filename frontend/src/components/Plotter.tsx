import { ReactFlow, Background, Controls, useNodesState, useEdgesState, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '../types/node.types';
import useDragAndDrop from '../hooks/useDragAndDrop';
import { useCallback, type DragEvent } from 'react';
import useAddNodes from '../hooks/useAddNodes';

export default function Plotter() {

	const [nodes, , onNodesChange] = useNodesState([]);
	const [edges, , onEdgesChange] = useEdgesState([]);
	const [draggedItem, ] = useDragAndDrop();
	const {addItemNode} = useAddNodes();

	const onDrop = useCallback((event: DragEvent) => {
		event.preventDefault();
		if (draggedItem != null) {
			addItemNode(draggedItem);
		}
	}, [draggedItem]);

	return (
		<ReactFlow
			colorMode = 'dark'
			nodeTypes = {nodeTypes}
			nodes = {nodes}
			edges = {edges}
			onNodesChange = {onNodesChange}
			onEdgesChange = {onEdgesChange}
			onDrop = {onDrop}
			onDragStart={(event: DragEvent) => { event.preventDefault() }}
			onDragOver={(event: DragEvent) => { event.preventDefault() }}
			fitView
		>
			<Background/>
			<Controls/>
		</ReactFlow>
	);
}
