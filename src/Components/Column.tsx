import React from 'react';
import Task from './Task';
import {Droppable} from "react-beautiful-dnd";
import {Card, CardBody, Typography} from "@material-tailwind/react";

const BottomList = () =>   {

    let content = [];
    for (let i = 1; i < 10; i++) {
        const item = <div className='border-t border-dotted shardow shadow-amber-500'>{i}</div>;
        content.push(item);
    }

    return <div className={'grid grid-cols-9 text-center'}>
        {content}
    </div>
}

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
                        <div className={'grid grid-cols-9 mb-1'}
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
                {column.id !== 'column-3' && <BottomList/>}

            </CardBody>
        </Card>
    )
}

export default Column

