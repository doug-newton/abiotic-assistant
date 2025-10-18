import { useState, type ChangeEvent } from 'react'
import classes from './AddItem.module.css'
import type { ItemData } from '../types/data.types'
import useAddNodes from '../hooks/useAddNodes'
import useStaticApiData from '../hooks/useStaticApiData'

export default function AddItem() {

    const [inputValue, setInputValue] = useState('');
    const { addItemNode } = useAddNodes();
    const { availableItems } = useStaticApiData();

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    const matchingItems: ItemData[] = 
        inputValue.length > 1 ? 
            availableItems.filter( item => item.item.includes(inputValue))
        : []

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