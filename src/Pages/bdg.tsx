import Column from "../Components/Column";
import {DragDropContext} from "react-beautiful-dnd";
import {useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";

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
            taskIds: ['task-1', 'task-2']
        }
    },
    columnOrder: ['column-1']
}
export default function Bdg() {
    const [tasks] = useState(initialData.tasks)
    const [columns, setColumns] = useState<any>(initialData.columns)
    const [columnOrder] = useState(initialData.columnOrder)

    const onDragStart = () => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
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
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';

        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        setColumns({
            ...columns,
            [newColumn.id]: newColumn,
        })
    }

    const TABLE_ROWS = [
        {
            name: "John Michael",
            job: "Manager",
            date: "23/04/18",
        },
        {
            name: "Alexa Liras",
            job: "Developer",
            date: "23/04/18",
        },
        {
            name: "Laurent Perrier",
            job: "Executive",
            date: "19/09/17",
        },
        {
            name: "Michael Levi",
            job: "Developer",
            date: "24/12/08",
        },
        {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21",
        },
    ];

    return <>
        <div className="container mx-auto pt-4">
            <div className="flex justify-center gap-4 mb-4">
                {
                    [1, 2, 3, ].map((item) =>
                        <Card className="w-56">
                            <CardHeader floated={false} className="h-auto">
                                <img src="/img/heroes/Sphinx.png" alt="profile-picture" />
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    SPINX
                                </Typography>
                                <Typography color="blue" className="font-medium" textGradient>
                                    +10% ATK
                                </Typography>
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

            <Card className="overflow-scroll h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <tbody>
                    {TABLE_ROWS.map(({ name, job, date }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4" : "mx-auto p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={name}>
                                <td className={classes} >
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                    {/*<img className={'w-full'} src="/img/heroes/Sphinx.png" alt="profile-picture" />*/}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {job}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {date}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                        Edit
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {job}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {date}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                        Edit
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </Card>
        </div>
    </>
}