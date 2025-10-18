import classes from './ItemNode.module.css'
import type { Node, NodeProps } from '@xyflow/react'
import { Handle, Position } from '@xyflow/react'
import type { ItemData } from '../types';
import useNodeRelation from '../hooks/useNodeRelationships';

export default function ItemNode({ id, data }: NodeProps<Node<ItemData>>) {
    const { item, quantity, imageSrc } = data;
    const { addItemSources } = useNodeRelation(id);

    return (
        <div className={classes['item-node']}>
            <div className={classes['image-panel']}>
                <img src={imageSrc} alt={item} />
            </div>
            <button className={classes['close-button']}>X</button>
            <h3>{item} <sup>({quantity})</sup></h3>
            <div className={classes['action-area']}>
                    <button onClick={() => addItemSources(item)}>find sources</button>
                    <button>find uses</button>
            </div>
            <Handle type="target" position={Position.Left}/>
            <Handle type="source" position={Position.Right}/>
        </div>
    )
}