import type { Node, Edge, XYPosition } from "@xyflow/react";
import type { ItemData, ItemTransform } from "../Types";

export function calcTransformInputPositions(
    currentPosition: XYPosition, 
    itemTransforms: ItemTransform[]) : XYPosition[] {

    const positions : XYPosition[] = []
    const blockSize = 200;
    const totalHeight = itemTransforms.length * blockSize;

    let blockTop = currentPosition.y - totalHeight / 2;
    const itemX = currentPosition.x - blockSize;

    for (let itemTransform of itemTransforms) {
        const itemStep = blockSize / (itemTransform.input.length + 1);
        let itemY = blockTop + itemStep;

        for (let i = 0; i < itemTransform.input.length; i++) {
            positions.push({ x: itemX, y: itemY });
            itemY += itemStep;
        }

        blockTop += blockSize;
    }

    return positions;
}

export function createTransformInputNodesAndEdges(
    itemTransforms: ItemTransform[],
    startNodeID: number,
    startEdgeID: number,
    targetID: string
): [Node[], Edge[]] {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    let newNodeID = startNodeID;
    let newEdgeID = startEdgeID;

    for (let itemTransform of itemTransforms) {
        for (let itemData of itemTransform.input) {

            const node: Node<ItemData> = {
                type: 'itemNode',
                id: `${newNodeID}`,
                position: { x: 0, y: 0 },
                data: itemData
            };

            const edge: Edge = {
                id: `${newEdgeID}`,
                label: itemTransform.transform,
                source: `${newNodeID}`,
                target: targetID,
                animated: true
            };

            newNodes.push(node);
            newEdges.push(edge);

            newNodeID++;
            newEdgeID++;
        }
    }

    return [newNodes, newEdges];
}
