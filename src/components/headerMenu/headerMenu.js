'use strict';
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import TodoList from "../todoList/todoList.js";
import { useTheme } from '../ThemeProvider.js';

import "./headerMenu.scss";

export const menuItems = [
    { path: '/', textNav: 'Головна', component: <div>Resume</div> },
    { path: '/weather', textNav: 'Список-задач', component: <TodoList/>},
    { path: '/taimer', textNav: 'SW', component: <div>SW</div>}
];

export default () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="header">

            <nav className="header-menu">
                {menuItems.map(({path, textNav}) => (
                    <NavLink key={path} className="header-menu-item" to={path}>
                        {textNav}
                    </NavLink>
                ))}
            </nav>

            <div className="theme-app">
                <div>Тема: <span className="theme-toggle" onClick={toggleTheme}>{theme}</span></div>
            </div>
        </div>
    );
};