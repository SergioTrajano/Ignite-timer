import { ReactNode, createContext, useEffect, useReducer, useState } from "react";

import { Task, taskReducer } from "../reducers/tasks/reducer";

import { differenceInSeconds } from "date-fns";
import {
    addTaskAction,
    interruptTaskAction,
    markTaskAsFinishedAction,
} from "../reducers/tasks/actions";

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
    activeTaskId: string | undefined;
    amountSecondsPast: number;

    markCurrentTaskAsFinished: () => void;
    updateSecondsPast: (newValue: number) => void;
    createNewTask: (newTask: NewTaskProps) => void;
    interruptTask: () => void;
}

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

export function TaskContextProvider({ children }: TaskProviderProps) {
    const [tasksState, dispatch] = useReducer(
        taskReducer,
        { tasks: [], activeTaskId: undefined },
        (initialState) => {
            const storedJSON = localStorage.getItem("@ignite-timer:tasksState-1.0.0");

            if (storedJSON) {
                return JSON.parse(storedJSON);
            }

            return initialState;
        }
    );

    const { activeTaskId, tasks } = tasksState;

    const activeTask = tasksState.tasks.find((task) => task.id === activeTaskId);

    const [amountSecondsPast, setAmountSecondsPast] = useState<number>(() => {
        if (activeTask) {
            return differenceInSeconds(new Date(), new Date(activeTask.startDate));
        }

        return 0;
    });

    function markCurrentTaskAsFinished() {
        dispatch(markTaskAsFinishedAction());
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

        dispatch(addTaskAction(newTask));

        setAmountSecondsPast(0);
    }

    function interruptTask() {
        dispatch(interruptTaskAction());
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

    useEffect(() => {
        localStorage.removeItem("@ignite-timer:tasksState-1.0.0");

        const stateJSON = JSON.stringify(tasksState);

        localStorage.setItem("@ignite-timer:tasksState-1.0.0", stateJSON);
    }, [tasksState]);

    return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
}
