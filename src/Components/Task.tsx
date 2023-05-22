import { Draggable } from 'react-beautiful-dnd';
import {Avatar} from "@material-tailwind/react";

const Task = ({task, index}: any) => {
    return <>
        <Draggable
            draggableId={task.id}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    data-dragging={snapshot.isDragging}
                >
                    <div {...provided.dragHandleProps} >
                        <Avatar
                            size="xxl"
                            variant="rounded"
                            src={task.img}
                            alt="profile picture"
                            className='aspect-square shadow-lg hover:shadow-pink-500/100'
                        />
                    </div>
                </div>
            )}
        </Draggable>
    </>

}

export default Task;