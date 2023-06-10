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

/* eslint-disable no-unused-vars */
export enum ActionTypes {
    ADD_NEW_TASK = "ADD_NEW_TASK",
    INTERRUPT_TASK = "INTERRUPT_TASK",
    MARK_CURRENT_TASK_AS_FINISHED = "MARK_CURRENT_TASK_AS_FINISHED",
}
/* eslint-enable no-unused-vars */

export function taskReducer(state: TasksState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.newTask],
                activeTaskId: action.newTask.id,
            };
        case ActionTypes.INTERRUPT_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === state.activeTaskId) {
                        return { ...task, interruptedDate: new Date() };
                    }

                    return task;
                }),
                activeTaskId: undefined,
            };
        case ActionTypes.MARK_CURRENT_TASK_AS_FINISHED:
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === state.activeTaskId) {
                        return { ...task, finishedDate: new Date() };
                    }

                    return task;
                }),
                activeTaskId: undefined,
            };
        default:
            return state;
    }
}
