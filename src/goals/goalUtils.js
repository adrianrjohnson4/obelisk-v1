let goals = [];

export const addGoal = ({ type, text }) => {
    if (!text || !text.trim()) return;
    
    const goal = {
        id: crypto.randomUUID(),
        type, // weekly, monthly, long_term
        createdAt: new Date(),
    };
    goals.push(goal);
    return goal;
};

export const getGoals = () => goals;

export const matchGoal = (taskText) => {
    if (!taskText) return null;

    return goals.find(goal => {

    return goal?.text && taskText.toLowerCase().includes(goal.text.toLowerCase())
});
};
