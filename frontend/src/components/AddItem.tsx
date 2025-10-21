import { useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import classes from './AddItem.module.css'
import type { ItemData } from '../types/data.types'
import useStaticApiData from '../hooks/useStaticApiData'
import useDragAndDrop from '../hooks/useDragAndDrop'

export default function AddItem() {

    const [inputValue, setInputValue] = useState('');
    const { availableItems } = useStaticApiData();
    const [, setDraggedItem] = useDragAndDrop();

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    const matchingItems: ItemData[] = 
        inputValue.length > 1 ? 
            availableItems.filter( item => item.item.includes(inputValue))
        : availableItems;

    function onDragStart(event: DragEvent, itemData: ItemData) {
        setDraggedItem(itemData);
        event.dataTransfer.effectAllowed = 'move';
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
                    <li 
                        draggable 
                        key={index} 
                        className={classes['add-item-item']} 
                        onDragStart={(event)=>onDragStart(event, item)}
                    >
                        <img className={classes['add-item-img']} src={item.imageSrc} alt={item.item} />
                        <span>{item.item}</span>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}