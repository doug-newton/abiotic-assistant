import type { Node, Edge, XYPosition } from "@xyflow/react";
import type { ItemData, ItemTransform } from "../types";

export function calcTransformInputPositions(
    currentPosition: XYPosition, 
    itemTransforms: ItemTransform[]) : XYPosition[] {

    const positions : XYPosition[] = []
    const blockHeight = 800;
    const blockWidth = 400;
    const totalHeight = itemTransforms.length * blockHeight;

    let blockTop = currentPosition.y - totalHeight / 2;
    const itemX = currentPosition.x - blockWidth;

    for (let itemTransform of itemTransforms) {
        const itemStep = blockHeight / (itemTransform.input.length + 1);
        let itemY = blockTop + itemStep;

        for (let i = 0; i < itemTransform.input.length; i++) {
            positions.push({ x: itemX, y: itemY });
            itemY += itemStep;
        }

        blockTop += blockHeight;
    }

    return positions;
}

export function createTransformInputNodesAndEdges(
    itemTransforms: ItemTransform[],
    targetID: string
): [Node[], Edge[]] {

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    
    const groupedNodes: {[key:string]:Node<ItemData>[]} = createGroupedNodes(itemTransforms);

    for (let transformType in groupedNodes) {
        const nodeList: Node<ItemData>[] = groupedNodes[transformType];
        nodes.push(...nodeList);
        edges.push(...(createEdges(transformType, nodeList, targetID)));
    }
    
    return [nodes, edges];
}

export function createItemNode(data: ItemData): Node<ItemData> {
    return {
        type: 'itemNode',
        id: crypto.randomUUID(),
        position: { x: 0, y: 0 },
        data: data
    };
}

function createEdges(label: string, sourceNodes: Node[], targetID: string): Edge[] {
    const edges: Edge[] = [];
    for (let sourceNode of sourceNodes) {
        edges.push({
            id: crypto.randomUUID(),
            label: label,
            source: sourceNode.id,
            target: targetID,
            animated: true
        })
    }
    return edges;
}

function createGroupedNodes(itemTransforms: ItemTransform[])
    : {[key:string]:Node<ItemData>[]} {

    const nodes: {[key:string]:Node<ItemData>[]} = {};

    for (let transform of itemTransforms) {
        const transformType = transform.transform;

        if (!Object.hasOwn(nodes, transformType)) {
            nodes[transformType] = [];
        }

        for (let item of transform.input) {
            const node = createItemNode(item);
            nodes[transformType].push(node);
        }
    }

    return nodes;
}