import { useEffect, useState } from "react";
import { getApiVersion, getItems } from "../api";
import type { ItemData } from "../types";

export default function useStaticApiData() {

	const [apiVersion, setApiVersion] = useState<string>('...');
    const [availableItems, setAvailableItems] = useState<ItemData[]>([]);

	useEffect(() => {
		(async() => {
			const apiInfo: {version:string} = await getApiVersion();
			setApiVersion(apiInfo.version);
		})();
	}, []);

    useEffect(() => {
        (async() => {
            const items: ItemData[] = await getItems();
            setAvailableItems(items);
        })();
    }, [])

    return {
        apiVersion,
        availableItems
    }
}