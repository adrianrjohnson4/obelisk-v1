import { useState, useEffect } from 'react';
import { db } from '../../src/firebaseConfig';
import {
    collection,
    addDoc,
    updateDoc,
    getDocs,
    doc,
    onSnapshot,
    serverTimestamp
  } from 'firebase/firestore';

  export const useObelisk = () => {
    const [tasks, setTasks] = useState([]);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const unsubTasks = onSnapshot(collection(db, 'tasks'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(data);
        });

        const unsubGoals = onSnapshot(collection(db, 'goals'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGoals(data)
        });

        return () => {
            unsubTasks();
            unsubGoals();
        };
    }, []);

    const addGoal = async ({ type, text }) => {
        if (!text || !text.trim()) return;

        const goal = {
            type,
            text: text.trim(),
            createdAt: serverTimestamp(),
        };

       await addDoc(collection(db, 'goals'), goal); 
    };

    const addTask = async (text, shape = '', energy = '') => {
        const matchedGoal = goals.find(g => text.toLowerCase().includes(g.text.toLowerCase()));
        const priority = 3;
        const weight = matchedGoal ? 5 : 2;
        const score = priority * weight;
    
        const task = {
          text: text.trim(),
          status: 'todo',
          priority,
          weight,
          score,
          goalId: matchedGoal?.id || null,
          shape: shape.trim() || null,
          energy: energy.trim() || null,
          createdAt: serverTimestamp(),
        };
        
        await addDoc(collection(db, 'tasks'), task);
    };

    const completeTask = async (taskId) => {
        const ref = doc(db, 'tasks', taskId);
        await updateDoc(ref, {
            status: 'done',
            completedAt: serverTimestamp()
        });
    };

    return {
        tasks,
        goals,
        addGoal,
        addTask,
        completeTask
    };
  };
  