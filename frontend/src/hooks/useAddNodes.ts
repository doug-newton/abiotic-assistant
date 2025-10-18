import { useReactFlow } from "@xyflow/react";
import type { ItemData } from "../types/data.types";
import { useCallback } from "react";
import { createItemNode } from "../helpers/nodes.helpers";

export default function useAddNodes() {

    const { addNodes } = useReactFlow();

    const addItemNode = useCallback((itemData: ItemData) => {
        const itemNode = createItemNode(itemData);
        addNodes(itemNode);
    },[])

    return {
        addItemNode
    }

}