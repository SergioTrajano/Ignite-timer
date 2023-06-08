import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";

import * as S from "./styles";

export function Home() {
    const { handleSubmit, register, watch } = useForm();

    const task = watch("task");
    const isSubmitDisabled = !task;

    function handleCreateTask() {}

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
                    <span>0</span>
                    <span>0</span>
                    <S.CountDownSeparator>:</S.CountDownSeparator>
                    <span>0</span>
                    <span>0</span>
                </S.CountDownContainer>

                <S.StartCountDownButton disabled={isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </S.StartCountDownButton>
            </form>
        </S.HomeContainer>
    );
}
