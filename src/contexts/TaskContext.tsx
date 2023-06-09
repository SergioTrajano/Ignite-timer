import { ReactNode, createContext, useState } from "react";

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
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0);

    const activeTask = tasks.find((task) => task.id === activeTaskId);

    function markCurrentTaskAsFinished() {
        setTasks((prev) =>
            prev.map((task) => {
                if (task.id === activeTaskId) {
                    return { ...task, finishedDate: new Date() };
                }

                return task;
            })
        );
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

        setTasks((prev) => [...prev, newTask]);
        setActiveTaskId(newTask.id);
        setAmountSecondsPast(0);
    }

    function interruptTask() {
        setTasks((prev) =>
            prev.map((task) => {
                if (activeTask?.id === activeTaskId) {
                    return { ...task, interruptedDate: new Date() };
                }

                return task;
            })
        );

        setActiveTaskId(null);
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
