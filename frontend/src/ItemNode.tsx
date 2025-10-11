import type { Edge, Node, NodeProps } from '@xyflow/react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import classes from './ItemNode.module.css'

const API_URL = import.meta.env.VITE_API_URL;

type ItemData = {
    item: string
    quantity: number
}

type ItemTransform = {
    input: ItemData[],
    transform: string,
    output: ItemData[]
}

async function getTransforms(item: string): Promise<ItemTransform[]> {
    const url = `${API_URL}/transforms/${item}`;
    const response = await fetch(url);
    const transforms: ItemTransform[] = await response.json();
    return transforms;
}

export default function ItemNode({ id, data }: NodeProps<Node<ItemData>>) {
    const { item, quantity } = data;

    const { getNodes, addNodes, getEdges, addEdges } = useReactFlow();

    async function onClick() {
        const itemTransforms : ItemTransform [] = await getTransforms(item);

        for (let itemTransform of itemTransforms) {
            const transformLabel: string = itemTransform.transform;
            for (let itemData of itemTransform.input) {
                addSourceItem(itemData, transformLabel);
            }
        }
    }

    function addSourceItem(itemData: ItemData, transformLabel: string) {
        const newNodeID: string = `${getNodes().length + 1}`;
        const newEdgeID: string = `${getEdges().length + 1}`;

        const node: Node<ItemData> = {
            type: 'itemNode',
            id: newNodeID,
            position: {
                x: 0,
                y: 0
            },
            data: itemData
        };

        const edge: Edge = {
            id: newEdgeID,
            label: transformLabel,
            source: newNodeID,
            target: id,
            animated: true
        };

        addNodes(node);
        addEdges(edge);
    }

    return (
        <div className={classes['item-node']}>
            <button onClick={onClick}>S</button>
            <span>{item} <small>({quantity})</small></span>
            <Handle type="target" position={Position.Left}/>
            <Handle type="source" position={Position.Right}/>
        </div>
    )
}