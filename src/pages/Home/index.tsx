import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

import { TaskContext } from "../../contexts/TaskContext";

import { CountDown } from "./components/CountDown";
import { FormButton } from "./components/FormButton";
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
    const { createNewTask } = useContext(TaskContext);

    const newCycleForm = useForm<newTaskProps>({
        resolver: zodResolver(newTaskSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });

    const { handleSubmit, reset } = newCycleForm;

    function handleCreateTask(data: newTaskProps) {
        createNewTask(data);

        reset();
    }

    return (
        <S.HomeContainer>
            <form onSubmit={handleSubmit(handleCreateTask)}>
                <FormProvider {...newCycleForm}>
                    <NewTask />

                    <CountDown />

                    <FormButton />
                </FormProvider>
            </form>
        </S.HomeContainer>
    );
}
