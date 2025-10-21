import { useReactFlow, type XYPosition } from "@xyflow/react";
import type { ItemData } from "../types/data.types";
import { useCallback } from "react";
import { createItemNode } from "../helpers/nodes.helpers";

export default function useAddNodes() {

    const { addNodes } = useReactFlow();

    const addItemNode = useCallback((itemData: ItemData, position: XYPosition) => {
        const itemNode = createItemNode(itemData);
        itemNode.position = {...position};
        addNodes(itemNode);
    },[])

    return {
        addItemNode
    }

}