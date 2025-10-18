import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react";

export function useDeleteNodes() {

    const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();

    const deleteNode = useCallback((id:string) => {
        setNodes(getNodes().filter(node => node.id !== id))
        setEdges(getEdges().filter(edge => !(edge.source === id || edge.target === id)))
    }, [])

    return {
        deleteNode
    }
}