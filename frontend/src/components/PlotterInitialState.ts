import type { Node, Edge } from '@xyflow/react'

export const initialNodes: Node[] = [
    {
        id: '1',
        type: 'itemNode',
        position: {x: 0, y: 150},
        data: {
            item: 'optic_lens',
            quantity: 1
        }
    }
];

export const initialEdges: Edge[] = [];