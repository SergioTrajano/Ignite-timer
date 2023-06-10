import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { TaskContext } from "../../../../contexts/TaskContext";

import * as S from "./styles";

export function FormButton() {
    const { activeTask, interruptTask } = useContext(TaskContext);
    const { watch } = useFormContext();

    function handleInterruptTask() {
        interruptTask();
    }

    const taskInputValue = watch("task");
    const minutesAmountInputValue = watch("minutesAmount");
    const isSubmitDisabled = !taskInputValue || !minutesAmountInputValue;

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
