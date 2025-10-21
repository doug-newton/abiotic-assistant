import { useContext } from "react";
import DragAndDropContext from "../contexts/DragAndDropContext";

export default function useDragAndDrop() {
    return useContext(DragAndDropContext);
}