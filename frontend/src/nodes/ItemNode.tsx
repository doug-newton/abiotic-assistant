import classes from './ItemNode.module.css'
import type { Edge, Node, NodeProps, XYPosition } from '@xyflow/react'
import { Handle, Position, useReactFlow, useInternalNode } from '@xyflow/react'
import type { ItemData, ItemTransform } from '../Types';
import { getTransforms } from '../Api';
import { calcTransformInputPositions, createTransformInputNodesAndEdges } from './NodeLogic';

export default function ItemNode({ id, data }: NodeProps<Node<ItemData>>) {
    const { item, quantity, imageSrc } = data;

    const internalNode = useInternalNode(id);
    const { getNodes, addNodes, getEdges, addEdges } = useReactFlow();

    async function addItemSources() {
        const itemTransforms: ItemTransform[] = await getTransforms(item);

        let startNodeID = getNodes().length + 1;
        let startEdgeID = getEdges().length + 1;

        const [newNodes, newEdges]: [Node[], Edge[]] = createTransformInputNodesAndEdges(
            itemTransforms,
            startNodeID,
            startEdgeID,
            id
        );

        const nodePositions : XYPosition[] = calcTransformInputPositions(
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
            <div className={classes['image-panel']}>
                <img src={imageSrc} alt={item} />
            </div>
            <button className={classes['close-button']}>X</button>
            <h3>{item} <sup>({quantity})</sup></h3>
            <div className={classes['action-area']}>
                    <button onClick={addItemSources}>find sources</button>
                    <button>find uses</button>
            </div>
            <Handle type="target" position={Position.Left}/>
            <Handle type="source" position={Position.Right}/>
        </div>
    )
}