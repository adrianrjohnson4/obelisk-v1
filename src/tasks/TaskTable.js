import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'task', headerName: 'Task Name', width: 250, editable: true },
    { field: 'priority', headerName: 'Priority', width: 100 },
    {
        field: 'status', headerName: 'Status', width: 150, editable: true, type: 'singleSelect',
        valueOptions: ['Todo', 'In Progress', 'Done']
    },
    { field: 'isTop3Today', headerName: 'Top 3 Task', width: 130 },
    { field: 'project', headerName: 'Project', width: 130 },
    { field: 'scheduledDate', headerName: 'Scheduled Date', width: 130 },
];

const paginationModel = { page: 0, pageSize: 5 };

const TaskTable = ({ tasks, setTasks }) => {

    const handleEdit = (params) => {
        const { id, field, value } = params;
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, [field]: value } : task
            )
        );
    };

    return (
        <Paper sx={{ height: 400, width: '40%' }}>
            <DataGrid
                rows={tasks}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                processRowUpdate={(newRow) => {
                    handleEdit({ id: newRow.id, field: 'task', value: newRow.task }); // fallback if needed
                    return newRow
                }}
                onCellEditCommit={handleEdit}
            />
        </Paper>
    )
}

export default TaskTable;