import type { Node, Edge } from '@xyflow/react'

export const initialNodes: Node[] = [
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

export const initialEdges: Edge[] = [];