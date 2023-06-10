import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";

import { TaskContext } from "../../../../contexts/TaskContext";

import * as S from "./styles";

export function CountDown() {
    const { activeTask, amountSecondsPast, markCurrentTaskAsFinished, updateSecondsPast } =
        useContext(TaskContext);

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
    }, [activeTask, currentSeconds, minutesLeft, secondsLeft]);

    useEffect(() => {
        let interval: number;

        if (activeTask) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    new Date(activeTask.startDate)
                );

                if (secondsDifference >= totalSeconds) {
                    markCurrentTaskAsFinished();

                    updateSecondsPast(totalSeconds);

                    clearInterval(interval);
                } else {
                    updateSecondsPast(secondsDifference);
                }
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [activeTask, totalSeconds, markCurrentTaskAsFinished, updateSecondsPast]);

    return (
        <S.CountDownContainer>
            <span>{minutesLeft[0]}</span>
            <span>{minutesLeft[1]}</span>
            <S.CountDownSeparator>:</S.CountDownSeparator>
            <span>{secondsLeft[0]}</span>
            <span>{secondsLeft[1]}</span>
        </S.CountDownContainer>
    );
}
