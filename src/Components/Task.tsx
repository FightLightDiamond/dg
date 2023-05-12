import { Draggable } from 'react-beautiful-dnd';
import {Avatar, Badge, Chip, ListItem, ListItemPrefix, Rating} from "@material-tailwind/react";

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
                    <ListItemPrefix {...provided.dragHandleProps} >
                        <Badge content="1" withBorder  >
                            <Avatar
                                size="xxl"
                                variant="rounded"
                                src={task.img}
                                alt="profile picture"
                                className='shadow-lg hover:shadow-pink-500/100'
                            />
                        </Badge>
                    </ListItemPrefix>
                </div>
            )}
        </Draggable>
    </>

}

export default Task;