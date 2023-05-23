import React, {useState} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"

const Column = () => {
    const [items, setItems] = useState<any>([
        {id: 1, className: 'bg-orange-100'},
        {id: 2, className: 'bg-red-400'},
        {id: 3, className: 'bg-blue-200'},
        {id: 4, className: 'bg-green-600'},
        {id: 5, className: 'bg-orange-700'},
        {id: 6, className: 'bg-green-100'},
        {id: 7, className: 'bg-pink-400'},
        {id: 8, className: ''},
    ])
    const [item2s, setItem2s] = useState<any>([
        {id: 9, className: 'bg-orange-100'},
        {id: 10, className: 'bg-red-400'},
        {id: 11, className: 'bg-blue-200'},
        {id: 12, className: 'bg-green-600'},
        {id: 13, className: 'bg-orange-700'},
        {id: 14, className: 'bg-green-100'},
        {id: 15, className: 'bg-pink-400'},
        {id: 16 , className: ''},
    ])

    function onDragStart(a: any) {
        console.log({a})
    }

    function onDragEnd(result: any) {
        const {destination, draggableId, source} = result;

        console.log({result})

        if (destination.droppableId === source.droppableId) {
            const to = items.find((item: any) => {
                if (item.id === destination.index) {
                    return item
                }
            })

            const from = items.find((item: any) => {
                if (item.id === source.index) {
                    return item
                }
            })

            console.log({to, from})

            const newItems = items.map((item: any) => {
                if (item.id === destination.index) {
                    const {className} = from
                    return {
                        ...item, className
                    }
                } else if (item.id === source.index) {
                    const {className} = to
                    return {
                        ...item, className
                    }
                }

                return item;
            })
            console.log({newItems})
            setItems(newItems)
        }

    }

    return (
        <>
            <div>
                <DragDropContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                >
                        <Droppable
                            key={1}
                            droppableId={'08080'}
                            direction="horizontal"
                        >
                            {
                                (provided, snapshot) =>
                                    <div className="grid grid-cols-8 mb-1"
                                         key={1}
                                         ref={provided.innerRef}
                                         {...provided.droppableProps}
                                         data-draggingover={snapshot.isDraggingOver}
                                    >
                                        {
                                            items.map((item: any, key: number) =>
                                                <Draggable
                                                    key={key}
                                                    draggableId={item.id + ''}
                                                    index={item.id}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div className={'aspect-square ' + item.className}
                                                             {...provided.draggableProps}
                                                             {...provided.dragHandleProps}
                                                             ref={provided.innerRef}
                                                             data-dragging={snapshot.isDragging}
                                                        >
                                                            <div {...provided.dragHandleProps} >
                                                                {item.className}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        }
                                        {provided.placeholder}
                                    </div>
                            }
                        </Droppable>

                    <Droppable
                            key={11}
                            droppableId={'080'}
                            direction="horizontal"
                        >
                            {
                                (provided, snapshot) =>
                                    <div className="grid grid-cols-8 mb-1"
                                         key={11}
                                         ref={provided.innerRef}
                                         {...provided.droppableProps}
                                         data-draggingover={snapshot.isDraggingOver}
                                    >
                                        {
                                            item2s.map((item: any, key: number) =>
                                                <Draggable
                                                    key={key}
                                                    draggableId={item?.draggableId + ''}
                                                    index={key}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div className={'aspect-square ' + item.className}
                                                             {...provided.draggableProps}
                                                             {...provided.dragHandleProps}
                                                             ref={provided.innerRef}
                                                             data-dragging={snapshot.isDragging}
                                                        >
                                                            <div {...provided.dragHandleProps} >
                                                                {item.className}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        }
                                        {provided.placeholder}
                                    </div>
                            }
                        </Droppable>
                </DragDropContext>
            </div>
        </>
    )
}

export default Column

