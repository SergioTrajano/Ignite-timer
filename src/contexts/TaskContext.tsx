import { ReactNode, createContext, useReducer, useState } from "react";

interface TaskProviderProps {
    children: ReactNode;
}

interface Task {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface TasksState {
    tasks: Task[];
    activeTaskId: string | undefined;
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
    const [tasksState, dispatch] = useReducer(
        (state: TasksState, action: any) => {
            switch (action.type) {
                case "ADD_NEW_TASK":
                    return {
                        ...state,
                        tasks: [...state.tasks, action.newTask],
                        activeTaskId: action.newTask.id,
                    };
                case "INTERRUPT_TASK":
                    return {
                        ...state,
                        tasks: state.tasks.map((task) => {
                            if (task.id === state.activeTaskId) {
                                return { ...task, interruptedDate: new Date() };
                            }

                            return task;
                        }),
                        activeTaskId: undefined,
                    };
                case "MARK_CURRENT_TASK_AS_FINISHED":
                    return {
                        ...state,
                        tasks: state.tasks.map((task) => {
                            if (task.id === state.activeTaskId) {
                                return { ...task, finishedDate: new Date() };
                            }

                            return task;
                        }),
                        activeTaskId: undefined,
                    };
                default:
                    return state;
            }
        },
        { tasks: [], activeTaskId: undefined }
    );

    const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0);

    const { activeTaskId, tasks } = tasksState;

    const activeTask = tasksState.tasks.find((task) => task.id === activeTaskId);

    function markCurrentTaskAsFinished() {
        dispatch({
            type: "MARK_CURRENT_TASK_AS_FINISHED",
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
            type: "ADD_NEW_TASK",
            newTask,
        });

        setAmountSecondsPast(0);
    }

    function interruptTask() {
        dispatch({
            type: "INTERRUPT_TASK",
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
