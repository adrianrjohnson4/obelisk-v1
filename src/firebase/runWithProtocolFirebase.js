import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const runWithProtocol = async ({ intent, alignmentCheck, action }) => {
    const aligned = alignmentCheck();
    if (!aligned) {
        await addDoc(collection(db, 'whyLogs'), {
            intent,
            result: 'Blocked: Misaligned',
            timestamp: serverTimestamp()
        });
        return { error: 'Not Aligned'};
    }

    const result = await action();

    await addDoc(collection(db, 'whyLogs'), {
        intent,
        result: result ?? 'No result returned',
        timestamp: serverTimestamp()
    });

    return result;
}
