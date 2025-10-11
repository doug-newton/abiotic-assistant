import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import classes from './ItemNode.module.css';

type ItemData = {
    item: string
    quantity: number
}

export default function ItemNode({ id, data }: NodeProps<Node<ItemData>>) {
    const { item, quantity } = data;

    return (
        <div className={classes['item-node']}>
            <span>{item} <small>({quantity})</small></span>
            <Handle type="target" position={Position.Left}/>
            <Handle type="source" position={Position.Right}/>
        </div>
    )
}