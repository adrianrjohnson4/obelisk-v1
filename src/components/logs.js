export const whyLogs = [];

export const logWhy = (entry) => {
    console.log("WHY LOG:", entry);
    whyLogs.push(entry);
}

export const getWhyLogs = () => [...whyLogs];