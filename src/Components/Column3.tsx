import {memo} from 'react';
import {Droppable, Draggable} from "react-beautiful-dnd";
import Task3 from "./Task3";


const InnerList = ({tasks}: any & any[]) => {
    return tasks.map((task: any, index: number) => (
        <Task3 key={task.id} task={task} index={index}/>
    ));
}

const areEqual = (prevProps: any, nextProps: any) => {
    return prevProps.tasks === nextProps.tasks;
}

const OnlyEvens = memo(InnerList, areEqual);

const Column3 = ({column, tasks, isDropDisabled, index}: {
    column: any,
    tasks: any[],
    isDropDisabled?: boolean,
    index: number
}) => {
    return (
        <Draggable draggableId={column.id}
                   index={index}
        >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div {...provided.dragHandleProps}>{column.title}1</div>
                    {/*//Droppable //for // Draggable*/}
                    <Droppable
                        droppableId={column.id}
                        type="task"
                        direction="horizontal"
                    >
                        {(provided, snapshot) => (
                            <div
                                className="grid grid-cols-8 gap-1 mb-1"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                data-draggingover={snapshot.isDraggingOver}
                            >
                                <OnlyEvens tasks={tasks}/>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

export default memo(Column3)

