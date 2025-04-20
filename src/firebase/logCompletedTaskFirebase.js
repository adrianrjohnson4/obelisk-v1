import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const logCompletedTask = async (task, reflection = null) => {
  const logEntry = {
    id: task.id,
    text: task.text,
    goalId: task.goalId || null,
    shape: task.shape || null,
    energy: task.energy || null,
    reflection: reflection || null,
    completedAt: serverTimestamp(),
  };

  await addDoc(collection(db, 'completedLog'), logEntry);
  console.log('✅ Archived Task:', logEntry);
};