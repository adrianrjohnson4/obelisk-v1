import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Chip, IconButton, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const paginationModel = { page: 0, pageSize: 5 };

const TaskTable = ({ tasks, setTasks }) => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'task',
            headerName: 'Task Name',
            width: 250,
            editable: true,
            renderCell: (params) => {
                const isDone = params.row.status === 'Done';
                return (
                    <span style={{
                        textDecoration: isDone ? 'line-through' : 'none',
                        opacity: isDone ? 0.6 : 1,
                        fontStyle: isDone ? 'italic' : 'normal'
                    }}>
                        {params.value}
                    </span>
                )
            }

        },
        {
            field: 'priority',
            headerName: 'Priority',
            width: 100,
            renderCell: (params) => {
                const value = params.value;

                const colorMap = {
                    5: 'error',
                    4: 'warning',
                    3: 'info',
                    2: 'default',
                    1: 'defualt'
                }

                return (
                    <Chip
                        label={`P${value}`}
                        color={colorMap[value] || 'default'}
                        size="small"
                        sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            backgroundColor: {
                                5: '#d32f2f',
                                4: '#f57c00',
                                3: '#0288d1',
                                2: '#757575',
                                1: '#9e9e9e'
                            }[value] || '#616161'
                        }}
                    />
                )
            }
        },
        {
            field: 'status', headerName: 'Status', width: 150, editable: true, type: 'singleSelect',
            valueOptions: ['Todo', 'In Progress', 'Done']
        },
        { field: 'isTop3Today', headerName: 'Top 3 Task', width: 130 },
        { field: 'project', headerName: 'Project', width: 130 },
        { field: 'scheduledDate', headerName: 'Scheduled Date', width: 130 },
        {
            field: 'delete',
            headerName: '',
            width: 60,
            renderCell: (params) => (
                <IconButton
                    onClick={() => handleDeleteClick(params.row.id)}
                    color="error"
                >
                    <DeleteIcon />
                </IconButton>

            ),
            sortable: false,
            filterable: false
        }
    ];

 
    const [deleteId, setDeleteId] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false)

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenConfirm(true);
    };

    const handleConfirmDelete = () => {
        setTasks((prev) => prev.filter((task) => task.id !== deleteId));
        setOpenConfirm(false);
        setDeleteId(null);
    };

    return (
        <div>
           <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={tasks}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                processRowUpdate={(newRow) => {
                    setTasks((prev) =>
                        prev.map((task) =>
                            task.id === newRow.id ? newRow : task
                        )
                    );
                    return newRow;
                }}
            />
        </Paper> 
        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to permanently delete this task? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
                <Button onClick={handleConfirmDelete} color="error"></Button>
            </DialogActions>
        </Dialog>
        </div>
        
    )
}

export default TaskTable;