import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { FocusSystem } from '../focus/FocusSystem';
import { GoalEngine } from '../goals/GoalEngine';
import { FlowSystem } from '../flow/FlowSystem';
import { ReviewSystem } from './ReviewSystem';
import { Home } from './Home';

export const AppLayout = () => {
    return (
        <div>
            <h1 style={{display: 'flex', justifyContent: 'center'}}>Obelisk</h1>

            <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={2}>

                    {/* Left Column */}
                    <Grid item xs={12} md={3}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">🏠 Home</Typography>
                            <Home />
                        </Paper>
                    </Grid>

                    {/* Center Column */}
                    <Grid item xs={12} md={5}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">🔥 Focus System</Typography>
                            <FocusSystem />
                        </Paper>

                        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                            <Typography variant="h6">🧠 Weekly Review</Typography>
                            <ReviewSystem />
                        </Paper>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">🌊 Flow System</Typography>
                            <FlowSystem />
                        </Paper>

                        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                            <Typography variant="h6">🎯 Goal Alignment</Typography>
                            <GoalEngine />
                        </Paper>
                    </Grid>

                </Grid>
            </Box>
        </div>

    );
};
