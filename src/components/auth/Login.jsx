import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Box, Alert, InputAdornment, IconButton, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { addLogin } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { lineNotify } from '../../services/lineService';

import LoginIcon from '@mui/icons-material/Login';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LockIcon from '@mui/icons-material/Lock';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { FaLine } from "react-icons/fa6"; import { Visibility, VisibilityOff, Person } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { FcGoogle } from "react-icons/fc";


export default function Login() {
    const theme = useTheme();
    const { login } = useAuth();
    const [warningMessage, setWarningMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false); // State for Alert visibility
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // For token
    const onSubmit = async (data) => {
        try {
            const response = await addLogin(data);

            if (!response.success) {
                // Handle errors and set warning message
                if (response.status === 404) {
                    setWarningMessage('User not found');
                } else if (response.status === 401) {
                    setWarningMessage('Password is incorrect');
                } else {
                    setWarningMessage(response.message || 'An error occurred');
                }
                setShowAlert(true); // Show the Alert
                return;
            }

            // If successful
            if (response.status === 200) {
                alert('Login successful');
                const userData = response.data.user;
                const token = response.data.token; 
                console.log(response ,token);
                if (token) {
                    login(userData, token); 
                }

                await lineNotify(`เข้าสู่ระบบโดย ${userData}`);
                reset();
            }
        } catch (error) {
            console.error('Error during login:', error);
            setWarningMessage('An unexpected error occurred');
            setShowAlert(true);
        }
    };

    
  


    const handleCloseAlert = () => {
        setShowAlert(false); // Close the Alert
    };

    const handleLineLogin = () => {
        // Implement Line login logic
        console.log('Login with Line');
    };

    const handleGoogleLogin = () => {
        // Implement Google login logic
        console.log('Login with Google');
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    p: 4,
                    width: '100%',
                    borderRadius: 2,
                    background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 3
                    }}
                >
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2
                        }}
                    >
                        <LoginIcon sx={{ color: '#fff', fontSize: 32 }} />
                    </Box>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            mb: 1
                        }}
                    >
                        Welcome Back
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        align="center"
                    >
                        Sign in to continue to your account
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {showAlert && (
                        <Alert
                            severity="error"
                            onClose={() => setShowAlert(false)}
                            sx={{ mb: 2 }}
                        >
                            {warningMessage}
                        </Alert>
                    )}

                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        {...register('username', {
                            required: 'Username is required'
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        label="Password"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 3 }}
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        endIcon={<ArrowRightAltIcon />}
                        sx={{
                            py: 1.5,
                            bgcolor: theme.palette.primary.main,
                            '&:hover': {
                                bgcolor: theme.palette.primary.dark,
                            },
                            mb: 2,
                            color: "#fff"
                        }}
                    >
                        Sign In
                    </Button>

                    <Box sx={{ position: 'relative', my: 3 }}>
                        <Divider>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    px: 2
                                }}
                            >
                                or continue with
                            </Typography>
                        </Divider>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            color="dark"
                            startIcon={<FcGoogle />}
                            sx={{ py: 1.5 }}
                        >
                            Google
                        </Button>
                        <Button
                            variant="outlined"
                            color="dark"
                            size="large"
                            startIcon={<FaLine style={{ color: "#00C300" }} />}  // เปลี่ยนสีเฉพาะไอคอน
                            sx={{ py: 1.5 }}
                        >
                            Line
                        </Button>

                    </Box>

                    <Button
                        component={Link}
                        to="/register"
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={<EditNoteIcon />}
                        color='dark'
                        sx={{ py: 1.5 }}
                    >
                        Create Account
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
