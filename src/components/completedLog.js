let completedLog = [];

export const logCompletedTask = (task, reflection = null) => {
    const logEntry = {
        id: task.id,
        text: task.text,
        goalId: task.goalId || null,
        shape: task.shape || null,
        energy: task.energy || null,
        reflection: reflection || null,
        completedAt: task.completedAt || new Date(),
    };

    completedLog.push(logEntry);
    console.log('✅ Archived Task:', logEntry)
};

export const getCompletedLog = () => [...completedLog];

export const filterCompletedLog = ({ shape, energy, goalId }) => {
    return completedLog.filter(entry => {
        return (!shape || entry.shape === shape)
        && (!energy || entry.energy === energy)
        && (!goalId || entry.goalId === goalId);
    });
};
