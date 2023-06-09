import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

import { TaskContext } from "../../contexts/TaskContext";

import { CountDown } from "./components/CountDown";
import { NewTask } from "./components/NewTask";

import * as S from "./styles";

const newTaskSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(1, "A tarefa precisa durar no mínimo 5 minutos.")
        .max(60, "A tarefa precisa durar no máximo 60 minutos."),
});

type newTaskProps = zod.infer<typeof newTaskSchema>;

export function Home() {
    const { activeTask, interruptTask, createNewTask } = useContext(TaskContext);

    const newCycleForm = useForm<newTaskProps>({
        resolver: zodResolver(newTaskSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleInterruptTask() {
        interruptTask();
    }

    function handleCreateTask(data: newTaskProps) {
        createNewTask(data);

        reset();
    }

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

    return (
        <S.HomeContainer>
            <form onSubmit={handleSubmit(handleCreateTask)}>
                <FormProvider {...newCycleForm}>
                    <NewTask />
                </FormProvider>

                <CountDown />

                {renderButtonBasedIfActiveTask()}
            </form>
        </S.HomeContainer>
    );
}
