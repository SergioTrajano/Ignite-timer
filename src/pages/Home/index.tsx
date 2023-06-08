import { zodResolver } from "@hookform/resolvers/zod";
import { Play } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import * as S from "./styles";

const newTaskSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(5, "A tarefa precisa durar no mínimo 5 minutos.")
        .max(60, "A tarefa precisa durar no máximo 60 minutos."),
});

type newTaskProps = zod.infer<typeof newTaskSchema>;

interface Task {
    id: string;
    task: string;
    minutesAmount: number;
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

    function handleCreateTask(data: newTaskProps) {
        const newTask: Task = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
        };

        setTasks((prev) => [...prev, newTask]);
        setActiveTaskId(newTask.id);

        reset();
    }

    const activeTask = tasks.find((task) => task.id === activeTaskId);

    const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;
    const currentSeconds = activeTask ? totalSeconds - amountSecondsPast : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutesLeft = String(minutesAmount).padStart(2, "0");
    const secondsLeft = String(secondsAmount).padStart(2, "0");

    const taskInputValue = watch("task");
    const isSubmitDisabled = !taskInputValue;

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
                        step={5}
                        min={0}
                        max={60}
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

                <S.StartCountDownButton disabled={isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </S.StartCountDownButton>
            </form>
        </S.HomeContainer>
    );
}
