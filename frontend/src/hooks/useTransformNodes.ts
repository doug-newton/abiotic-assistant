import { useInternalNode, useReactFlow } from "@xyflow/react";
import type { Node, Edge, XYPosition } from "@xyflow/react";
import { getTransforms } from "../Api";
import type { ItemTransform } from "../Types";
import { calcTransformInputPositions, createTransformInputNodesAndEdges } from "../nodes/NodeLogic";
import { useCallback } from "react";

export default function useTransformNodes(id: string) {
    const internalNode = useInternalNode(id);
    const { getNodes, addNodes, getEdges, addEdges } = useReactFlow();

    const addItemSources = useCallback(async (item: string) => {
        const itemTransforms: ItemTransform[] = await getTransforms(item);

        let startNodeID = getNodes().length + 1;
        let startEdgeID = getEdges().length + 1;

        const [newNodes, newEdges]: [Node[], Edge[]] = createTransformInputNodesAndEdges(
            itemTransforms,
            startNodeID,
            startEdgeID,
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
