import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { addRegister } from '../../services/authService';

export default function Register() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },

    } = useForm();

    const onSubmit = async (data) => {
        const response = await addRegister(data);
        if (response.status === 200) {
            alert('Register successfully');
            reset();
        }
    };


    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={7} sx={{ padding: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <TextField
                            label="Username"
                            type="text"
                            fullWidth
                            margin="normal"
                            {...register('username', {
                                required: 'Username is required'
                            })}
                            error={!!errors.username}
                            helperText={errors.username ? errors.username.message : ""}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            margin="normal"
                            label="Password"
                            type="password"
                            fullWidth
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            })}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ""}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ color: '#fff' }}
                    >
                        Register
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ marginY: 1 }}
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
