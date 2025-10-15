import type { ItemData, ItemTransform } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getApiVersion(): Promise<{version:string}> {
    const url = `${API_URL}/v`;

    try {
        const response = await fetch(url);
        const json: {version:string} = await response.json();
        return json;
    }
    catch (error) {
        console.error(`Couldn't fetch data: ${error}`);
        return { version: '?' }
    }
}

export async function getItems(): Promise<ItemData[]> {
    const url = `${API_URL}/items`;

    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`Server error ${response.status}`);
        }

        const items: ItemData[] = await response.json();

        return items;
    }
    catch (error) {
        console.error(`Couldn't fetch data: ${error}`);
        return [];
    }
}

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
