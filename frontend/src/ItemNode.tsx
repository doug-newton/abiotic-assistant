import type { Edge, Node, NodeProps } from '@xyflow/react'
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

export default function ItemNode({ id, data }: NodeProps<Node<ItemData>>) {
    const { item, quantity } = data;
    const internalNode = useInternalNode(id);
    const { getNodes, addNodes, getEdges, addEdges } = useReactFlow();

    async function onClick() {
        const itemTransforms: ItemTransform[] = await getTransforms(item);

        const currentX = internalNode ? internalNode.position.x : 0;
        const currentY = internalNode ? internalNode.position.y : 0;
        const blockSize = 200;

        const itemX = currentX - blockSize;

        const totalHeight = blockSize * (itemTransforms.length);
        let blockTop = currentY - totalHeight / 2;

        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        let newNodeID = getNodes().length + 1;
        let newEdgeID = getEdges().length + 1;

        for (let itemTransform of itemTransforms) {
            const itemStep = blockSize / (itemTransform.input.length + 1);
            let itemY = blockTop + itemStep;

            for (let itemData of itemTransform.input) {
                console.log(`${itemX}, ${itemY}`)
                const node: Node<ItemData> = {
                    type: 'itemNode',
                    id: `${newNodeID}`,
                    position: {
                        x: itemX,
                        y: itemY 
                    },
                    data: itemData
                };

                const edge: Edge = {
                    id: `${newEdgeID}`,
                    label: itemTransform.transform,
                    source: `${newNodeID}`,
                    target: id,
                    animated: true
                };

                newNodes.push(node);
                newEdges.push(edge);

                newNodeID++;
                newEdgeID++;

                itemY += itemStep;
            }

            blockTop += blockSize;
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