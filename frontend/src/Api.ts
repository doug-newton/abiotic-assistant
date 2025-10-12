import type { ItemTransform } from "./Types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTransforms(item: string): Promise<ItemTransform[]> {
    const url = `${API_URL}/transforms/${item}`;
    const response = await fetch(url);
    
    try {
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