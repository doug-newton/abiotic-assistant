import type { ItemTransform } from "./Types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTransforms(item: string): Promise<ItemTransform[]> {
    const url = `${API_URL}/transforms/${item}`;
    const response = await fetch(url);
    const transforms: ItemTransform[] = await response.json();
    return transforms;
}
