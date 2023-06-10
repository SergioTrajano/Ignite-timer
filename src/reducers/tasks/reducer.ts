import { produce } from "immer";

import { ActionTypes } from "./actions";

export interface Task {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface TasksState {
    tasks: Task[];
    activeTaskId: string | undefined;
}

export function taskReducer(state: TasksState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_TASK: {
            return produce(state, (draft) => {
                draft.tasks.push(action.newTask);
                draft.activeTaskId = action.newTask.id;
            });
        }
        case ActionTypes.INTERRUPT_TASK: {
            const currentTaskIndex = state.tasks.findIndex(
                (task) => task.id === state.activeTaskId
            );

            if (currentTaskIndex < 0) {
                return state;
            }

            return produce(state, (draft) => {
                draft.tasks[currentTaskIndex].interruptedDate = new Date();
                draft.activeTaskId = undefined;
            });
        }
        case ActionTypes.MARK_CURRENT_TASK_AS_FINISHED: {
            const currentTaskIndex = state.tasks.findIndex(
                (task) => task.id === state.activeTaskId
            );

            if (currentTaskIndex < 0) {
                return state;
            }

            return produce(state, (draft) => {
                draft.tasks[currentTaskIndex].finishedDate = new Date();
                draft.activeTaskId = undefined;
            });
        }
        default: {
            return state;
        }
    }
}
