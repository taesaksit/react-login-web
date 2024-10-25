// Menu.js
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home'; // Home icon
import InfoIcon from '@mui/icons-material/Info'; // About icon
import AssessmentIcon from '@mui/icons-material/Assessment'; // Stock icon
import LoginIcon from '@mui/icons-material/Login'; // Login icon
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Menu({ open, onDrawerClose }) {
    const { user } = useAuth(); // Access user from AuthContext
    const theme = useTheme();
    const location = useLocation();

    const handleDrawerClose = () => {
        onDrawerClose();
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                {/* Display user info here */}
                {user ? `Welcome: ${user}` : 'Welcome!'} 
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem key="Home" disablePadding>
                    <ListItemButton component={Link} to="/" selected={location.pathname === '/'}>
                        <ListItemIcon>
                            <HomeIcon /> {/* Use Home icon */}
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                <ListItem key="About" disablePadding>
                    <ListItemButton component={Link} to="/about" selected={location.pathname === '/about'}>
                        <ListItemIcon>
                            <InfoIcon /> {/* Use Info icon */}
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>

                <ListItem key="Stock" disablePadding>
                    <ListItemButton component={Link} to="/stock" selected={location.pathname === '/stock'}>
                        <ListItemIcon>
                            <AssessmentIcon /> {/* Use Assessment icon */}
                        </ListItemIcon>
                        <ListItemText primary="Stock" />
                    </ListItemButton>
                </ListItem>

                <ListItem key="Login" disablePadding>
                    <ListItemButton component={Link} to="/login" selected={location.pathname === '/login'}>
                        <ListItemIcon>
                            <LoginIcon /> {/* Use Login icon */}
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
