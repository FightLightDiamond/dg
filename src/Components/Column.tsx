import React from 'react';
import Task from './Task';
import {Droppable} from "react-beautiful-dnd";
import {Card, CardBody, Typography} from "@material-tailwind/react";


const Column = ({column, tasks, isDropDisabled}:  {column: any, tasks: any[], isDropDisabled?: boolean, index?: number}) => {
    return (
        <Card className="mx-auto mb-4">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {column.title}
                </Typography>
                <Droppable
                    droppableId={column.id}
                    direction="horizontal"
                >
                    {(provided, snapshot) => (
                        <div className={'flex flex-row justify-between'}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            data-draggingover={snapshot.isDraggingOver}
                        >
                            {
                                tasks.map(
                                    (task: any, index: number) =>
                                        <Task key={task.id} task={task} index={index}/>
                                )
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </CardBody>
        </Card>
    )
}

export default Column

