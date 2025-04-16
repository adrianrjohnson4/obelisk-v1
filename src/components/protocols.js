import { logWhy } from './logs';

export const runWithProtocol = async ({ intent, alignmentCheck, action }) => {
    const aligned = alignmentCheck();
    if (!aligned) {
        logWhy({ intent, result: 'Blocked: Misaligned', timestamp: new Date() });
        return { error: 'Not aligned' };
    } 

    const result = await action();
    logWhy({ intent, result, timestamp: new Date() });
    return result;
}
