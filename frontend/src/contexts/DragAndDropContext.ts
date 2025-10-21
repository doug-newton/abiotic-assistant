import { createContext } from "react";
import type { ItemData } from "../types/data.types";

export type DragAndDropDataType = ItemData | null;

const DragAndDropContext = createContext<[DragAndDropDataType, (_: DragAndDropDataType) => void]>(
    [
        null,
        _ => { }
    ]
);

export default DragAndDropContext;