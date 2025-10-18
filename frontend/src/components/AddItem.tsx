import { useEffect, useState, type ChangeEvent } from 'react'
import classes from './AddItem.module.css'
import type { ItemData } from '../types'
import { getItems } from '../api'
import useAddNodes from '../hooks/useAddNodes'

export default function AddItem() {

    const [inputValue, setInputValue] = useState('');
    const [availableItems, setAvailableItems] = useState<ItemData[]>([]);
    const [matchingItems, setMatchingItems] = useState<ItemData[]>([]);
    const { addItemNode } = useAddNodes();

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    useEffect(() => {
        (async() => {
            const items: ItemData[] = await getItems();
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
                item => item.item.includes(inputValue)
        ))
    }, [inputValue, availableItems])

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
                    <li className={classes['add-item-item']} key={index} onClick={()=>addItemNode(item)}>{item.item}</li>
                ))
            }
            </ul>
        </div>
    )
}