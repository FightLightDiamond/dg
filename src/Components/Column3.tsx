import {memo} from 'react';
import Task3 from "./Task3";


const InnerList = ({tasks}: any & any[]) => {
    return tasks.map((task: any) => (
        <Task3 key={task.rowId} task={task} index={task.rowId}/>
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
        <div className="grid grid-cols-8 gap-4 mb-1">
            <OnlyEvens tasks={tasks}/>
        </div>
    )
}

export default memo(Column3)

