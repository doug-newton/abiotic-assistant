import type { Edge, Node, NodeProps, XYPosition } from '@xyflow/react'
import { Handle, Position, useReactFlow, useInternalNode } from '@xyflow/react'
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

function calculatePositions(
    currentPosition: XYPosition, 
    itemTransforms: ItemTransform[]) : XYPosition[] {

    const positions : XYPosition[] = []
    const blockSize = 200;
    const totalHeight = itemTransforms.length * blockSize;

    let blockTop = currentPosition.y - totalHeight / 2;
    const itemX = currentPosition.x - blockSize;

    for (let itemTransform of itemTransforms) {
        const itemStep = blockSize / (itemTransform.input.length + 1);
        let itemY = blockTop + itemStep;

        for (let i = 0; i < itemTransform.input.length; i++) {
            positions.push({ x: itemX, y: itemY });
            itemY += itemStep;
        }

        blockTop += blockSize;
    }

    return positions;
}

function createNodesAndEdges(
    itemTransforms: ItemTransform[],
    startNodeID: number,
    startEdgeID: number,
    targetID: string
): [Node[], Edge[]] {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    let newNodeID = startNodeID;
    let newEdgeID = startEdgeID;

    for (let itemTransform of itemTransforms) {
        for (let itemData of itemTransform.input) {

            const node: Node<ItemData> = {
                type: 'itemNode',
                id: `${newNodeID}`,
                position: { x: 0, y: 0 },
                data: itemData
            };

            const edge: Edge = {
                id: `${newEdgeID}`,
                label: itemTransform.transform,
                source: `${newNodeID}`,
                target: targetID,
                animated: true
            };

            newNodes.push(node);
            newEdges.push(edge);

            newNodeID++;
            newEdgeID++;
        }
    }

    return [newNodes, newEdges];
}

export default function ItemNode({ id, data }: NodeProps<Node<ItemData>>) {
    const { item, quantity } = data;
    const internalNode = useInternalNode(id);
    const { getNodes, addNodes, getEdges, addEdges } = useReactFlow();

    async function onClick() {
        const itemTransforms: ItemTransform[] = await getTransforms(item);

        let startNodeID = getNodes().length + 1;
        let startEdgeID = getEdges().length + 1;

        const [newNodes, newEdges] = createNodesAndEdges(
            itemTransforms,
            startNodeID,
            startEdgeID,
            id
        );

        const nodePositions : XYPosition[] = calculatePositions(
            internalNode ? internalNode.position : { x: 0, y: 0 },
            itemTransforms
        );

        for (let i = 0; i < newNodes.length; i++) {
            newNodes[i].position.x = nodePositions[i].x;
            newNodes[i].position.y = nodePositions[i].y;
        }

        addNodes(newNodes);
        addEdges(newEdges);
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