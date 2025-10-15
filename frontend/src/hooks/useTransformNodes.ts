import { useInternalNode, useReactFlow } from "@xyflow/react";
import type { Node, Edge, XYPosition } from "@xyflow/react";
import { getTransforms } from "../api";
import type { ItemTransform } from "../types";
import { calcTransformInputPositions, createTransformInputNodesAndEdges } from "../helpers/nodes.helpers";
import { useCallback } from "react";

export default function useTransformNodes(id: string) {
    const internalNode = useInternalNode(id);
    const { addNodes, addEdges } = useReactFlow();

    const addItemSources = useCallback(async (item: string) => {
        const itemTransforms: ItemTransform[] = await getTransforms(item);

        const [newNodes, newEdges]: [Node[], Edge[]] = createTransformInputNodesAndEdges(
            itemTransforms,
            id
        );

        const nodePositions : XYPosition[] = calcTransformInputPositions(
            internalNode ? internalNode.position : { x: 0, y: 0 },
            itemTransforms
        );

        for (let i = 0; i < newNodes.length; i++) {
            newNodes[i].position.x = nodePositions[i].x;
            newNodes[i].position.y = nodePositions[i].y;
        }

        addNodes(newNodes);
        addEdges(newEdges);
    }, [internalNode])

    return { addItemSources }
}
