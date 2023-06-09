import { formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
    const { tasks } = useContext(TaskContext);

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.task}</td>
                                <td>{task.minutesAmount} minutos</td>
                                <td>
                                    {formatDistanceToNow(task.startDate, {
                                        addSuffix: true,
                                        locale: ptBr,
                                    })}
                                </td>
                                <td>
                                    {task.finishedDate && (
                                        <Status statusColor="green">Concluído</Status>
                                    )}
                                    {task.interruptedDate && (
                                        <Status statusColor="red">Interrompido</Status>
                                    )}
                                    {!task.interruptedDate && !task.finishedDate && (
                                        <Status statusColor="yellow">Em andamento</Status>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}
