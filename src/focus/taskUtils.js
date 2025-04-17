import { matchGoal } from "../goals/goalUtils";

let tasks = [];

export const addTask = (text) => {
    const goal = matchGoal(text); // returns goal or undefined

    const task = {
        id: crypto.randomUUID(),
        text,
        status: 'todo',
        priority: 3,
        weight: goal ? 5 : 2,
        goalId: goal?.id || null,
        createdAt: new Date(),
    };
    
    tasks.push(task);
    return task;
}

export const getTopTasks = () => 
    tasks
        .filter(t => t.status === 'todo')
        .sort((a, b) => a.priority - b.priority)
        .slice(0, 3);

export const getAllTasks = () => tasks;

export const completeTask = (id) => {
    const t = tasks.find(task => task.id === id);
    if (t) {
        t.status = 'done';
        t.completedAt = new Date();
    }
};
