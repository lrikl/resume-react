'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route  } from "react-router-dom"; 

import { Provider } from 'react-redux';
import store from './store/store.js';

import ErrorBoundary from "./components/ErrorBoundary.js";
import HeaderMenu, { menuItems } from './components/headerMenu/headerMenu.js';
import Footer from './components/footer/footer.js';
import { ThemeProvider } from './components/ThemeProvider.js';

import './style.scss';

const MainContent = () => { 
    return (
        <div className="main-content">
            <Routes>
                {menuItems.map(({ path, component }, index) => (
                    <Route key={index} path={path} element={component} /> 
                ))}
            </Routes>
        </div>
    );
};

const RootComponent = () => {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <HashRouter>
                    <ThemeProvider>
                        <HeaderMenu />
                        <MainContent />
                        <Footer/>
                    </ThemeProvider>
                </HashRouter>
            </Provider>
        </ErrorBoundary>
    );
};


const rootNodeElement = document.querySelector('#main');
const root = ReactDOM.createRoot(rootNodeElement);
root.render(<RootComponent />);