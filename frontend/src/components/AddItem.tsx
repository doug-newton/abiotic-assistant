import { useEffect, useState, type ChangeEvent } from 'react'
import classes from './AddItem.module.css'
import { useReactFlow } from '@xyflow/react'
import type { Node } from '@xyflow/react'
import type { ItemData } from '../Types'
import { getItems } from '../Api'

export default function AddItem() {

    const [inputValue, setInputValue] = useState('');
    const [availableItems, setAvailableItems] = useState<string[]>([]);
    const [matchingItems, setMatchingItems] = useState<string[]>([]);
    const { getNodes, addNodes } = useReactFlow();

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    useEffect(() => {
        (async() => {
            const items: string[] = await getItems();
            setAvailableItems(items);
        })();
    }, [])

    useEffect(() => {
        if (inputValue == '') {
            setMatchingItems([]);
            return;
        }
        setMatchingItems(
            availableItems.filter(
                item => item.includes(inputValue)
        ))
    }, [inputValue, availableItems])

    function addItem(item: string) {
        const newID = `${getNodes().length + 1}`;

        const newNode: Node<ItemData> = {
            id: newID,
            type: 'itemNode',
            position: {
                x: 0,
                y: 0,
            },
            data: {
                item: item,
                quantity: 1
            }
        }

        addNodes(newNode)
    }

    return (
        <div className={classes['add-item-panel']}>
            <h3 className={classes['add-item-heading']}>Add Item</h3>
            <div className={classes['add-item-input-wrapper']}>
                <input className={classes['add-item-input']} type="text" name="item" onChange={onChange} value={inputValue} />
                <button onClick={() => setInputValue('')}>clear</button>
            </div>
            <ul className={classes['add-item-list']}>
            {
                matchingItems.map((item, index) => (
                    <li className={classes['add-item-item']} key={index} onClick={()=>addItem(item)}>{item}</li>
                ))
            }
            </ul>
        </div>
    )
}