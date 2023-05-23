import {DragDropContext, Droppable} from "react-beautiful-dnd";
import React, {useState} from "react";
import Column3 from "../Components/Column3";

const initialData: any = {
    tasks: {
        'task-1': {id: 'task-1', content: 'abc'},
        'task-2': {id: 'task-2', content: 'abc2'},
        'task-3': {id: 'task-3', content: 'abc3'},
        'task-4': {id: 'task-4', content: 'abc4'},
        'task-5': {id: 'task-5', content: 'abc5'},
        'task-6': {id: 'task-6', content: 'abc6'},
        'task-7': {id: 'task-7', content: 'abc7'},
        'task-8': {id: 'task-8', content: 'abc8'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'to do',
            taskIds: [
                {id: 1, item: 'task-1'},
                {id: 2, item: 'task-2'},
                {id: 3, item: 'task-3'},
                {id: 4, item: 'task-4'},
                {id: 5, item: 'task-5'},
                {id: 6, item: 'task-6'},
                {id: 7, item: 'task-1'},
                {id: 8, item: 'task-1'},
            ]
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: [
                {id: 11, item: 'task-1'},
                {id: 21, item: 'task-2'},
                {id: 31, item: 'task-3'},
                {id: 41, item: 'task-4'},
                {id: 51, item: 'task-5'},
                {id: 61, item: 'task-6'},
                {id: 71, item: 'task-1'},
                {id: 81, item: 'task-1'},
            ]
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [
                {id: 12, item: 'task-1'},
                {id: 22, item: 'task-2'},
                {id: 32, item: 'task-3'},
                {id: 42, item: 'task-4'},
                {id: 52, item: 'task-5'},
                {id: 62, item: 'task-6'},
                {id: 72, item: 'task-1'},
                {id: 82, item: 'task-1'},
            ]
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}

interface ITaskColumn {
    id: number,
    item: string
}

const InnerList = ({column, taskMap, index}: {
    column: any
    taskMap: any
    index: number
}) => {
    const tasks = column.taskIds.map((taskId: ITaskColumn) => {
       return {...taskMap[taskId.item], rowId: taskId.id}
    });
    return <Column3 column={column} tasks={tasks} index={index} isDropDisabled={false}/>;

}

export default function Bdg3() {
    const [tasks, setTasks] = useState(initialData.tasks)
    const [columns, setColumns] = useState<any>(initialData.columns)
    const [columnOrder, setColumnOrder] = useState(initialData.columnOrder)
    const [homeIndex, setHomeIndex] = useState<number | null>(null)


    const onDragStart = (home: any) => {
        // const homeIndex = columnOrder.indexOf(home.source.droppableId);
        // setHomeIndex(homeIndex)
    };

    /**
     * Update data
     * @param result
     */
    const onDragEnd = (result: any) => {
        setHomeIndex(null)
        const {destination, source, draggableId, type} = result;
        console.log({result})

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        /**
         * Di chuyển cả column
         */
        if (type === 'column') {
            const newColumnOrder = Array.from(columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            setColumnOrder(newColumnOrder)
            return;
        }

        const home = columns[source.droppableId];
        const foreign = columns[destination.droppableId];

        if (source.droppableId === destination.droppableId) {
            const newTaskIds = Array.from(home.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, {...home.taskIds[source.index], id: draggableId});

            const newColumn = {
                ...home,
                taskIds: newTaskIds,
            };

            console.log({
                ...columns,
                [newColumn.id]: newColumn,
            })

            setColumns({
                ...columns,
                [newColumn.id]: newColumn,
            })

            return;
        }

        // Moving from one list to another
        const homeTaskIds = Array.from(home.taskIds);
        // homeTaskIds.splice(source.index, 1);

        homeTaskIds[source.index] = foreign.taskIds[destination.index]

        const newHome = {
            ...home,
            taskIds: homeTaskIds,
        };

        const foreignTaskIds = Array.from(foreign.taskIds)
        // foreignTaskIds.splice(destination.index, 0, draggableId);
        foreignTaskIds[destination.index] = home.taskIds[source.index]

        const newFinish = {
            ...foreign,
            taskIds: foreignTaskIds,
        };

        console.log({
            ...columns,
            [newHome.id]: newHome,
            [newFinish.id]: newFinish,
        })

        // setColumns({
        //     ...columns,
        //     [newHome.id]: newHome,
        //     [newFinish.id]: newFinish,
        // })
    };

    return <>
        <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
            >
                {(provided) => (
                    <div  className="grid grid-cols-1"
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
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </>
}