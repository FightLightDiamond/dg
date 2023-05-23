import Column from "../Components/Column";
import {DragDropContext} from "react-beautiful-dnd";
import {useState} from "react";
import {IconButton,
    Card,
    CardHeader,
    CardBody,
    Typography
} from "@material-tailwind/react";

const initialData: any = {
    tasks: {
        'task-1': {id: 'task-1', content: 'abc', img: '/img/avatar/sprinx.png'},
        'task-2': {id: 'task-2', content: 'abc2', img: '/img/avatar/Hell.png'},
        'task-3': {id: 'task-3', content: 'abc3', img: '/img/avatar/Hera.png'},
        'task-4': {id: 'task-4', content: 'abc4', img: '/img/avatar/amon.png'},
        'task-5': {id: 'task-5', content: 'abc5', img: '/img/avatar/Chiron.png'},
        'task-6': {id: 'task-6', content: 'abc6', img: '/img/avatar/Darklord.png'},
        'task-7': {id: 'task-7', content: 'abc7', img: '/img/avatar/Fenrir.png'},
        'task-8': {id: 'task-8', content: 'abc8', img: '/img/avatar/pandora.png'},
        'task-9': {id: 'task-9', content: 'abc9', img: ''},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Pre',
            taskIds: [
                'task-1',
                'task-2',
                'task-3',
                'task-4',
                'task-5',
                'task-6',
                'task-7',
                'task-8',
                'task-9',
            ]
        },
        'column-2': {
            id: 'column-2',
            title: 'Ready',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Remove',
            taskIds: []
        },
    },
    columnOrder: ['column-1', 'column-2']
}
export default function Bdg() {
    const [tasks] = useState(initialData.tasks)
    const [columns, setColumns] = useState<any>(initialData.columns)
    const [columnOrder] = useState(initialData.columnOrder)
    const [homeIndex, setHomeIndex] = useState<number| null>(null)


    const onDragStart = (home: any) => {
        // document.body.style.color = 'orange';
        // document.body.style.transition = 'background-color 0.2s ease';
        // const homeIndex = columnOrder.indexOf(home.source.droppableId);
        // setHomeIndex(homeIndex)
    }

    const onDragUpdate = (update: any) => {
        // const {destination} = update;
        // const opacity = destination
        //     ? destination.index / Object.keys(tasks).length
        //     : 0;
        // document.body.style.backgroundColor = `rgba( 153, 141, 217, ${opacity})`;
    };

    /**
     * Update data
     * @param result
     */
    const onDragEnd = (result: any) => {
        console.log({result});
        setHomeIndex(null)
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const home = columns[source.droppableId];
        const foreign = columns[destination.droppableId];

        if (home === foreign) {
            const newTaskIds = Array.from(home.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...home,
                taskIds: newTaskIds,
            };

            setColumns({
                ...columns,
                [newColumn.id]: newColumn,
            })

            return;
        }

        // Moving from one list to another
        const homeTaskIds = Array.from(home.taskIds);
        homeTaskIds.splice(source.index, 1);
        const newHome = {
            ...home,
            taskIds: homeTaskIds,
        };

        const foreignTaskIds = Array.from(foreign.taskIds);
        foreignTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...foreign,
            taskIds: foreignTaskIds,
        };

        setColumns({
            ...columns,
            [newHome.id]: newHome,
            [newFinish.id]: newFinish,
        })
    };


    return <>
        <div className="container mx-auto pt-4">
            <div className="flex justify-center gap-4 mb-4">
                {
                    [1, 2, 3, ].map((item) =>
                        <Card
                            key={item}
                            shadow={true}
                            className="relative grid
                items-end justify-center overflow-hidden text-center shadow-lg hover:shadow-pink-500/50"
                        >
                            <CardHeader
                                color="transparent"
                                className="absolute inset-0 m-0 h-full w-full rounded-none"
                            >
                                <img className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" src="/img/heroes/Sphinx.png" alt="profile-picture" />
                            </CardHeader>
                            <CardBody className="bg-white bg-opacity-80 isolate relative
                            opacity-0 hover:opacity-100
                            relative py-10 px-6 md:px-12 shadow-light-indigo-500">
                                <Typography
                                    variant="h2"
                                    // color="indigo"
                                    className="mb-6 font-bold"
                                >
                                    SPINX
                                </Typography>
                                <Typography variant="h5" className="mb-4 font-bold underline decoration-wavy">
                                    +10% ATK
                                </Typography>

                                <IconButton size='sm' color='red' className='absolute bottom-0 right-0 rotate- cursor-wait'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </IconButton>

                                <IconButton size='sm' color='blue'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </IconButton>

                                <IconButton size='sm' color='blue' className='cursor-n-resize'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </IconButton>
                            </CardBody>
                        </Card>
                    )
                }
            </div>

            <div className={'mb-4'}>
                <DragDropContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragUpdate={onDragUpdate}
                >
                    {
                        columnOrder.map((columnId: string) => {
                                const column = columns[columnId];
                                const tasksColumn = column.taskIds.map((taskId: string) => tasks[taskId]);

                                return <Column isDropDisabled={false} key={column.id} column={column} tasks={tasksColumn}/>;
                            }
                        )
                    }
                </DragDropContext>
            </div>

        </div>
    </>
}