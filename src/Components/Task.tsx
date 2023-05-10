import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import {Chip, ListItem, ListItemPrefix} from "@material-tailwind/react";

const Task = ({task, index}: any) => {
    return <>
        <Draggable
            draggableId={task.id}
            index={index}
        >
            {(provided, snapshot) => (
                <ListItem
                    className='border'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    data-dragging={snapshot.isDragging}
                >
                    <ListItemPrefix {...provided.dragHandleProps}>
                       <Chip value="chip" />
                    </ListItemPrefix>
                    <div>
                        {task.content }
                    </div>
                </ListItem>
            )}
        </Draggable>
    </>

}

export default Task;