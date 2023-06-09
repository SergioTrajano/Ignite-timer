import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

import { CountDown } from "./components/CountDown";
import { NewTask } from "./components/NewTask";

import * as S from "./styles";

interface Task {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

const newTaskSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(1, "A tarefa precisa durar no mínimo 5 minutos.")
        .max(60, "A tarefa precisa durar no máximo 60 minutos."),
});

type newTaskProps = zod.infer<typeof newTaskSchema>;

interface TaskContextProps {
    activeTask: Task | undefined;
    activeTaskId: string | null;
    amountSecondsPast: number;

    markCurrentTaskAsFinished: () => void;
    updateSecondsPast: (newValue: number) => void;
}

export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0);

    const newCycleForm = useForm<newTaskProps>({
        resolver: zodResolver(newTaskSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    const activeTask = tasks.find((task) => task.id === activeTaskId);

    const taskInputValue = watch("task");
    const minutesAmountInputValue = watch("minutesAmount");
    const isSubmitDisabled = !taskInputValue || !minutesAmountInputValue;

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

    function renderButtonBasedIfActiveTask() {
        if (activeTask) {
            return (
                <S.StopCountDownButton
                    type="button"
                    onClick={handleInterruptTask}
                >
                    <HandPalm size={24} />
                    Interromper
                </S.StopCountDownButton>
            );
        }

        return (
            <S.StartCountDownButton
                type="submit"
                disabled={isSubmitDisabled}
            >
                <Play size={24} />
                Começar
            </S.StartCountDownButton>
        );
    }

    function handleInterruptTask() {
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

    function handleCreateTask(data: newTaskProps) {
        const newTask: Task = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        setTasks((prev) => [...prev, newTask]);
        setActiveTaskId(newTask.id);
        setAmountSecondsPast(0);

        reset();
    }

    return (
        <S.HomeContainer>
            <form onSubmit={handleSubmit(handleCreateTask)}>
                <TaskContext.Provider
                    value={{
                        activeTask,
                        activeTaskId,
                        amountSecondsPast,
                        updateSecondsPast,
                        markCurrentTaskAsFinished,
                    }}
                >
                    <FormProvider {...newCycleForm}>
                        <NewTask />
                    </FormProvider>

                    <CountDown />
                </TaskContext.Provider>

                {renderButtonBasedIfActiveTask()}
            </form>
        </S.HomeContainer>
    );
}
