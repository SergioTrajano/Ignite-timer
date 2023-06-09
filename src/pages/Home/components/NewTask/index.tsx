import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { TaskContext } from "../..";

import * as S from "./style";

export function NewTask() {
    const { activeTask } = useContext(TaskContext);

    const { register } = useFormContext();

    return (
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
    );
}
