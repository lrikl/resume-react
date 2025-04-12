'use strict';
import React from 'react';
import { NavLink, useLocation  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../../slices/themeSlice.js';
import {
    Container,
    AppBar,
    Toolbar,
    Box,
    Switch,
    BottomNavigation,
    BottomNavigationAction
} from '@mui/material';

import TodoList from "../todoList/todoList.js";
import Resume from '../resume/resume.js';

export const menuItems = [
    { path: '/', textNav: 'Resume', component: <Resume/> },
    { path: '/todoList', textNav: 'Todo-List', component: <TodoList/>},
    { path: '/sw', textNav: 'Star Wars', component: <div>SW</div>}
];

export default () => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();
    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const location = useLocation();
    const currentPath = menuItems.find(item => item.path === location.pathname) ? location.pathname : false;

    return (
        <Container maxWidth="lg" sx={{ my: 5 }} className='header'>
            <AppBar 
                elevation={3} 
                position="static" 
                sx={{ 
                    borderRadius: 2, 
                    backgroundColor: theme === 'dark' ? '#121212' : "#fff",
                    backgroundImage: theme === 'dark' ? 'linear-gradient(rgba(255, 255, 255, 0.082), rgba(255, 255, 255, 0.082))' : 'none',   
                }}
            > 
                <Toolbar>

                    <BottomNavigation
                        value={currentPath}
                        sx={{ bgcolor: 'transparent', flexGrow: 1, justifyContent: 'flex-start' }}
                        showLabels
                    >
                        {menuItems.map(({ path, textNav }) => (
                           <BottomNavigationAction
                                key={path}
                                label={textNav}
                                value={path}
                                component={NavLink}
                                to={path}
                                className='btn-nav-link'
                                sx={{
                                    maxWidth: '140px',
                                    fontWeight: 700,
                                    '.MuiBottomNavigationAction-label': {
                                        fontSize: '16px',
                                    },
                                    '&.Mui-selected': {
                                        '.MuiBottomNavigationAction-label': { 
                                            fontSize: '16px',
                                        }
                                    },
                                    
                                    '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)' 
                                    }
                                }}
                            />
                        ))}
                    </BottomNavigation>

                    <Box display="flex" alignItems="center" gap={1}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd" 
                                clipRule="evenodd"
                                d="M2.263 9.745L.008 12l2.255 2.255a9.941 9.941 0 001.26 3.04v3.19h3.19a9.94 9.94 0 003.04 1.26L12.007 24l2.255-2.255a9.943 9.943 0 003.04-1.26h3.19v-3.191a9.944 9.944 0 001.26-3.039L24.007 12l-2.256-2.255a9.944 9.944 0 00-1.259-3.039V3.514H17.3a9.942 9.942 0 00-3.037-1.259L12.008 0 9.752 2.255a9.941 9.941 0 00-3.037 1.259H3.523v3.192a9.942 9.942 0 00-1.26 3.039zM14.008 12c0 2.421-2.435 4.508-4.5 5.456a6 6 0 100-10.912c2.065.948 4.5 3.035 4.5 5.456z"
                                fill="#ACB6C5"
                            />
                        </svg>
                        <Switch
                            checked={theme === 'dark'}
                            onChange={handleThemeToggle}
                            sx={{
                                '& .MuiSwitch-thumb': {
                                    backgroundColor: 'orange',
                                },

                                '& .MuiSwitch-track': {
                                    backgroundColor: '#ccc', 
                                    opacity: 0.7,        
                                },

                                '& .Mui-checked': {
                                    '& .MuiSwitch-thumb': {
                                        backgroundColor: '#fff', 
                                    }
                                },
                            }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </Container>
    );
};