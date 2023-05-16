import Column from "../Components/Column";
import {DragDropContext} from "react-beautiful-dnd";
import {useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography, Button, CardFooter, Avatar,
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
    columnOrder: ['column-1', 'column-2', 'column-3']
}
export default function Bdg() {
    const [tasks] = useState(initialData.tasks)
    const [columns, setColumns] = useState<any>(initialData.columns)
    const [columnOrder] = useState(initialData.columnOrder)
    const [homeIndex, setHomeIndex] = useState<number| null>(null)


    const onDragStart = (home: any) => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
        const homeIndex = columnOrder.indexOf(home.source.droppableId);
        setHomeIndex(homeIndex)
    }

    const onDragUpdate = (update: any) => {
        const {destination} = update;
        const opacity = destination
            ? destination.index / Object.keys(tasks).length
            : 0;
        document.body.style.backgroundColor = `rgba( 153, 141, 217, ${opacity})`;
    };

    /**
     * Update data
     * @param result
     */
    const onDragEnd = (result: any) => {
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
                            <CardBody className="bg-white bg-opacity-80
                            opacity-0 hover:opacity-100
                            relative py-14 px-6 md:px-12 shadow-light-indigo-500">
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
                            </CardBody>
                        </Card>
                        // <Card className="max-w-xs">
                        //     <CardHeader floated={false} className="h-auto">
                        //         <img src="/img/heroes/Sphinx.png" alt="profile-picture" />
                        //     </CardHeader>
                        //     <CardBody className="text-center">
                        //         {/*<Typography variant="h4" color="indigo-gray" className="mb-2">*/}
                        //         {/*    SPINX*/}
                        //         {/*</Typography>*/}
                        //         <Typography color="indigo" className="font-medium" textGradient>
                        //             +10% ATK
                        //         </Typography>
                        //     </CardBody>
                        //     {/*<CardFooter className="pt-0">*/}
                        //     {/*    /!*<Button*!/*/}
                        //     {/*    /!*    ripple={false}*!/*/}
                        //     {/*    /!*    fullWidth={true}*!/*/}
                        //     {/*    /!*    className="bg-indigo-gray-900/10 text-indigo-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"*!/*/}
                        //     {/*    /!*>*!/*/}
                        //     {/*    /!*    Add to Cart*!/*/}
                        //     {/*    /!*</Button>*!/*/}
                        //     {/*</CardFooter>*/}
                        // </Card>
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