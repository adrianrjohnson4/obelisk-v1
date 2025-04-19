 import { useSystemState } from './SystemContext';

 export const useObelisk = () => {
    const { systemState, setSystemState } = useSystemState();

    const addGoal = ({ type, text }) => {
        if (!text || !text.trim()) return;

        const goal = {
            id: crypto.randomUUID(),
            type,
            text: text.trim(),
            createdAt: new Date(),
        };

        setSystemState(prev => ({
            ...prev,
            goals: [...prev.goals, goal]
        }));
    };

    const addTask = (text, shape = '', energy = '') => {
        const goal = systemState.goals.find(g =>
            text.toLowerCase().includes(g.text.toLowerCase())
        );

        const priority = 3;
        const weight = goal ? 5 : 2;

        const safeShape = typeof shape === 'string' ? shape.trim() : '';
        const safeEnergy = typeof energy === 'string' ? energy.trim() : '';

        const task = {
            id: crypto.randomUUID(),
            text: text.trim(),
            status: 'todo',
            priority,
            weight,
            goalId: goal?.id || null,
            shape: safeShape || null,
            energy: safeEnergy || null,
            score: priority * weight,
            createdAt: new Date(),
          };
      
          console.log('Task Added:', task);
          setSystemState(prev => ({
            ...prev,
            tasks: [...prev.tasks, task]
          }));
    };

    const completeTask = (id) => {
        setSystemState(prev => ({
            ...prev,
            tasks: prev.tasks.map(t => t.id === id ? { ...t, status: 'done', completedAt: new Date()} : t)
        })); 
    };

    return {
        tasks: systemState.tasks,
        goals: systemState.goals,
        addGoal,
        addTask,
        completeTask,
    };
 };