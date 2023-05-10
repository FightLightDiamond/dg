import {DragDropContext, Droppable} from "react-beautiful-dnd";
import React, {useState} from "react";
import styled from "styled-components";
import Column3 from "../Components/Column3";

const initialData: any = {
    tasks: {
        'task-1': {id: 'task-1', content: 'abc'},
        'task-2': {id: 'task-2', content: 'abc2'},
        'task-3': {id: 'task-3', content: 'abc3'},
        'task-4': {id: 'task-4', content: 'abc4'},
        'task-5': {id: 'task-5', content: 'abc5'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'to do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: []
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}

const Container = styled.div`
  display: flex;
`;

const InnerList = ({column, taskMap, index}: any) => {
    const tasks = column.taskIds.map((taskId: number) => taskMap[taskId]);
    return <Column3 column={column} tasks={tasks} index={index} isDropDisabled={false}/>;

}

export default function Bdg4() {
    const [tasks, setTasks] = useState(initialData.tasks)
    const [columns, setColumns] = useState<any>(initialData.columns)
    const [columnOrder, setColumnOrder] = useState(initialData.columnOrder)
    const [homeIndex, setHomeIndex] = useState<number | null>(null)


    const onDragStart = (home: any, provided: any) => {
        provided.announce(
            `You have lifted the task in position ${home.source.index + 1}`,
        );
    };

    const onDragUpdate = (update: any, provided: any) => {
        const message = update.destination
            ? `You have moved the task to position ${update.destination.index + 1}`
            : `You are currently not over a droppable area`;

        provided.announce(message);
    };

    /**
     * Update data
     * @param result
     * @param provided
     */
    const onDragEnd = (result: any, provided: any) => {
        const message = result.destination
            ? `You have moved the task from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
            : `The task has been returned to its starting position of
        ${result.source.index + 1}`;

        provided.announce(message);

        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            setColumnOrder(newColumnOrder)
            return;
        }

        const home = columns[source.droppableId];
        const foreign = columns[destination.droppableId];

        if (home === foreign) {
            const newTaskIds = Array.from(home.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newHome = {
                ...home,
                taskIds: newTaskIds,
            };

            setColumns({
                ...columns,
                [newHome.id]: newHome,
            })

            return;
        }

        // moving from one list to another
        const homeTaskIds = Array.from(home.taskIds);
        homeTaskIds.splice(source.index, 1);
        const newHome = {
            ...home,
            taskIds: homeTaskIds,
        };

        const foreignTaskIds = Array.from(foreign.taskIds);
        foreignTaskIds.splice(destination.index, 0, draggableId);
        const newForeign = {
            ...foreign,
            taskIds: foreignTaskIds,
        };

        setColumns({
            ...columns,
            [newHome.id]: newHome,
            [newForeign.id]: newForeign,
        })
    };

    return <>
        <DragDropContext
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
            >
                {(provided) => (
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            columnOrder.map((columnId: string, index: number) => {
                                const column = columns[columnId];
                                return <InnerList
                                    key={column.id}
                                    column={column}
                                    taskMap={tasks}
                                    index={index}
                                />
                            })
                        }
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    </>
}