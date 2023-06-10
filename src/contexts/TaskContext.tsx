import { ReactNode, createContext, useReducer, useState } from "react";

import { ActionTypes, Task, taskReducer } from "../reducers/taskReducer";

interface TaskProviderProps {
    children: ReactNode;
}

interface NewTaskProps {
    task: string;
    minutesAmount: number;
}

interface TaskContextProps {
    tasks: Task[];
    activeTask: Task | undefined;
    activeTaskId: string | null;
    amountSecondsPast: number;

    markCurrentTaskAsFinished: () => void;
    updateSecondsPast: (newValue: number) => void;
    createNewTask: (newTask: NewTaskProps) => void;
    interruptTask: () => void;
}

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

export function TaskContextProvider({ children }: TaskProviderProps) {
    const [tasksState, dispatch] = useReducer(taskReducer, { tasks: [], activeTaskId: undefined });

    const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0);

    const { activeTaskId, tasks } = tasksState;

    const activeTask = tasksState.tasks.find((task) => task.id === activeTaskId);

    function markCurrentTaskAsFinished() {
        dispatch({
            type: ActionTypes.MARK_CURRENT_TASK_AS_FINISHED,
            activeTaskId,
        });
    }

    function updateSecondsPast(newValue: number) {
        setAmountSecondsPast(newValue);
    }

    function createNewTask(data: NewTaskProps) {
        const newTask: Task = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        dispatch({
            type: ActionTypes.ADD_NEW_TASK,
            newTask,
        });

        setAmountSecondsPast(0);
    }

    function interruptTask() {
        dispatch({
            type: ActionTypes.INTERRUPT_TASK,
            activeTaskId,
        });
    }

    const contextValue = {
        tasks,
        activeTask,
        activeTaskId,
        amountSecondsPast,
        updateSecondsPast,
        markCurrentTaskAsFinished,
        createNewTask,
        interruptTask,
    };

    return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
}
