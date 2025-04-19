import { useObelisk } from "./useObelisk";

export const useAttentionPulse = () => {
    const { tasks, goals } = useObelisk();

    const topTask = tasks
        .filter(t => t.status === 'todo')
        .sort((a, b) => (b.score || 0) - (a.score || 0))[0];

    const orphanedGoals = goals.filter(goal => {
        const linked = tasks.some(t => t.goalId === goal.id);
        return !linked;
    });

    const unfinishedTask = tasks.find(t => t.status === 'todo' && new Date(t.createdAt) < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000));

    const pulse = [];

    if (topTask) pulse.push({ type: 'topTask', label: `🔸 Focus: ${topTask.text}` });
    if (unfinishedTask) pulse.push({ type: 'drifted', label: `🕳️ Unfinished: ${unfinishedTask.text}` });
    if (orphanedGoals.length > 0) pulse.push({ type: 'orphanedGoal', label: `🎯 Goal needs love: ${orphanedGoals[0].text}` });

    return pulse;
}