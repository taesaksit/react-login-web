import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function NotFound() {


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
            }}
        >
            <Typography variant="h1" component="h1" sx={{ color: '#1976d2' }}>
                404
            </Typography>
            <Typography variant="h5" component="h2" sx={{ marginBottom: '20px' }}>
                Page Not Found
            </Typography>

        </Box>
    );
}
