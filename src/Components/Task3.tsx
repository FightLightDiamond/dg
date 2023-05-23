import {Draggable, Droppable} from 'react-beautiful-dnd';

const Task3 = ({task, index}: any) => {
    return <div className={'p-4 border-2 bg-gray-300'}>
        <Droppable
            droppableId={task.id}
            // direction="horizontal"
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    data-draggingover={snapshot.isDraggingOver}
                >
                    <Draggable
                        draggableId={task.rowId + ''}
                        index={index}
                        // isDragDisabled={true}
                    >
                        {(provided, snapshot) => (
                            // snapshot - status
                            <div className={'aspect-square border-2 border-amber-200'}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 ref={provided.innerRef}
                                 data-dragging={snapshot.isDragging}
                                 aria-roledescription="Press space bar to lift the task"
                            >
                                <div {...provided.dragHandleProps}>
                                    {task.content} {task.rowId} {index}
                                </div>
                            </div>
                        )}
                    </Draggable>
                    <div style={{ visibility: 'hidden', height: 0 }}>
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    </div>

}

export default Task3;