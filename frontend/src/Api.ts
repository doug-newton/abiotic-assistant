import type { ItemTransform } from "./Types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTransforms(item: string): Promise<ItemTransform[]> {
    const url = `${API_URL}/transforms/${item}`;
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Server error ${response.status}`);
        }

        const transforms: ItemTransform[] = await response.json();
        return transforms;
    }
    catch (error) {
        console.error(`Couldn't fetch data: ${error}`);
        return [];
    }
}

export async function getItems(): Promise<string[]> {
    const url = `${API_URL}/items`;

    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`Server error ${response.status}`);
        }

        /*
            Response format:
            [{
                "items": [
                    "...",
                ]
            }]
        */

        const itemListObjectList: {items:string[]}[] = await response.json();

        if (itemListObjectList.length != 1) {
            throw new Error(`Data returned is in unexpected format`);
        }

        const itemListObject = itemListObjectList[0];
        return itemListObject.items;
    }
    catch (error) {
        console.error(`Couldn't fetch data: ${error}`);
        return [];
    }
}