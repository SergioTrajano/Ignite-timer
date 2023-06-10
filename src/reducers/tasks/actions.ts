import { Task } from "./reducer";

/* eslint-disable no-unused-vars */
export enum ActionTypes {
    ADD_NEW_TASK = "ADD_NEW_TASK",
    INTERRUPT_TASK = "INTERRUPT_TASK",
    MARK_CURRENT_TASK_AS_FINISHED = "MARK_CURRENT_TASK_AS_FINISHED",
}
/* eslint-enable no-unused-vars */

export function addTaskAction(newTask: Task) {
    return {
        type: ActionTypes.ADD_NEW_TASK,
        newTask,
    };
}

export function interruptTaskAction() {
    return {
        type: ActionTypes.INTERRUPT_TASK,
    };
}

export function markTaskAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CURRENT_TASK_AS_FINISHED,
    };
}
