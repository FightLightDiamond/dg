import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import {Droppable} from "react-beautiful-dnd";
import {Card, CardBody, List, Typography} from "@material-tailwind/react";


const Column = ({column, tasks, isDropDisabled}:  {column: any, tasks: any[], isDropDisabled?: boolean, index?: number}) => {
    return (
        <Card className="mx-auto">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {column.title}
                </Typography>
                <Droppable
                    droppableId={column.id}
                    // direction="horizontal"
                >
                    {(provided, snapshot) => (
                        <List
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
                        </List>
                    )}
                </Droppable>
            </CardBody>
        </Card>
    )
}

export default Column

