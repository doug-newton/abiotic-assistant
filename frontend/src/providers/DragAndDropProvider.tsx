import { useState } from "react";
import DragAndDropContext from "../contexts/DragAndDropContext";
import type { ReactNode } from "react";
import type { DragAndDropDataType } from "../contexts/DragAndDropContext";

export default function DragAndDropProvider({children}:{children:ReactNode}) {

    const [draggedItem, setDraggedItem] = useState<DragAndDropDataType>(null);

    return (
        <DragAndDropContext value={[draggedItem, setDraggedItem]}>
            {children}
        </DragAndDropContext>
    )
}