import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
} from "react-beautiful-dnd";
import {useState} from "react";

const Dg = () => {
    const itemsNormal = {
        available: [
            {
                id: 1,
                uuid: "7bfa4398a4477-888",
                title: "What is Lorem Ipsum?",
                subtitle: "Lorem Ipsum is simply dummy",
                updatedAt: "6 days ago",
            },
            {
                id: 2,
                uuid: "7bfa4398a448-999",
                title: "Why do we use it?",
                subtitle: "The point of using at its layout",
                updatedAt: "2 days ago",
            },
        ],

        assigned: [
            {
                id: 5,
                uuid: "7bfa4398a450",
                title: "Where can I get some?",
                subtitle: "There are many variations",
                updatedAt: "6 days ago",
            },
            {
                id: 6,
                uuid: "7bfa4398a451",
                title: "Morbi sagittis tellus a efficitur",
                subtitle: "Etiam mollis eros eget mi.",
                updatedAt: "2 days ago",
            },
        ],
    };

    const [items, setItems] = useState(itemsNormal);

    const removeFromdiv = (div: any, index: any) => {
        const result = Array.from(div);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const addTodiv = (div: any, index: any, element: any) => {
        const result = Array.from(div);
        result.splice(index, 0, element);
        return result;
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            console.log(result);
            return;
        }
        const divCopy: any = {...items};
        const sourcediv = divCopy[result.source.droppableId];
        const [removedElement, newSourcediv] = removeFromdiv(
            sourcediv,
            result.source.index
        );
        divCopy[result.source.droppableId] = newSourcediv;

        const destinationdiv = divCopy[result.destination.droppableId];
        divCopy[result.destination.droppableId] = addTodiv(
            destinationdiv,
            result.destination.index,
            removedElement
        );
        setItems(divCopy);
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex p-12">
                    <div title="Disponíveis" onDragEnd={onDragEnd}>
                        {items.available.map((item, index) => (
                            <Draggable key={item.uuid} draggableId={item.uuid + ""} index={index}>
                                {(
                                    provided: DraggableProvided | any,
                                    snapshot: DraggableStateSnapshot
                                ) => (
                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div>
                                                {item.uuid}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                    <div title="Atribuídos" onDragEnd={onDragEnd}>
                        {items.assigned.map((item, index) => (
                            <Draggable draggableId={item.uuid} index={index} key={item.uuid}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div>
                                            {item.uuid}
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                </div>
            </DragDropContext>
        </>
    );
};

export default Dg;
