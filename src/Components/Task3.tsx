import {Draggable} from 'react-beautiful-dnd';


const Task3 = ({task, index}: any) => {
    // const isDragDisabled = task.id === 'task-1';

    return <>
        <Draggable
            draggableId={task.id}
            index={index}
            // isDragDisabled={isDragDisabled}
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
                        {task.content}
                    </div>
                </div>
            )}
        </Draggable>
    </>

}

export default Task3;