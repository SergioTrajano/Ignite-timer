import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";
import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import * as S from "./styles";

const newTaskSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(1, "A tarefa precisa durar no mínimo 5 minutos.")
        .max(60, "A tarefa precisa durar no máximo 60 minutos."),
});

type newTaskProps = zod.infer<typeof newTaskSchema>;

interface Task {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0);

    const { handleSubmit, register, watch, reset } = useForm<newTaskProps>({
        resolver: zodResolver(newTaskSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });

    const activeTask = tasks.find((task) => task.id === activeTaskId);

    const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;
    const currentSeconds = activeTask ? totalSeconds - amountSecondsPast : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutesLeft = String(minutesAmount).padStart(2, "0");
    const secondsLeft = String(secondsAmount).padStart(2, "0");

    useEffect(() => {
        if (document.hidden && activeTask && currentSeconds !== 0) {
            document.title = `${minutesLeft}: ${secondsLeft}`;
        } else {
            document.title = `Ignite timer`;
        }
    }, [activeTask, currentSeconds, minutesLeft, secondsLeft, totalSeconds]);

    useEffect(() => {
        let interval: number;

        if (activeTask) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeTask.startDate);

                if (secondsDifference >= totalSeconds) {
                    setTasks((prev) =>
                        prev.map((task) => {
                            if (task.id === activeTaskId) {
                                return { ...task, finishedDate: new Date() };
                            }

                            return task;
                        })
                    );

                    setAmountSecondsPast(totalSeconds);
                    clearInterval(interval);
                } else {
                    setAmountSecondsPast(secondsDifference);
                }
            }, 1000);
        }
    }, [activeTask, activeTaskId, totalSeconds]);

    const taskInputValue = watch("task");
    const minutesAmountInputValue = watch("minutesAmount");
    const isSubmitDisabled = !taskInputValue || !minutesAmountInputValue;

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
                <S.FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <S.TaskInput
                        id="task"
                        type="text"
                        placeholder="Dê um nome para o seu projeto"
                        list="taskSuggestions"
                        disabled={!!activeTask}
                        {...register("task")}
                    />

                    <datalist id="taskSuggestions">
                        <option value="projeto 1" />
                        <option value="projeto 2" />
                        <option value="projeto 3" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <S.MinutesAmountInput
                        id="minutesAmount"
                        type="number"
                        placeholder="00"
                        min={1}
                        max={60}
                        disabled={!!activeTask}
                        {...register("minutesAmount", { valueAsNumber: true })}
                    />

                    <span>minutos.</span>
                </S.FormContainer>

                <S.CountDownContainer>
                    <span>{minutesLeft[0]}</span>
                    <span>{minutesLeft[1]}</span>
                    <S.CountDownSeparator>:</S.CountDownSeparator>
                    <span>{secondsLeft[0]}</span>
                    <span>{secondsLeft[1]}</span>
                </S.CountDownContainer>

                {renderButtonBasedIfActiveTask()}
            </form>
        </S.HomeContainer>
    );
}
