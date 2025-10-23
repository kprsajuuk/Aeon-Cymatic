import React from 'react';
import { ConfigProvider, theme } from 'antd';
import Main from '@/pages/main/Main';
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import './App.css';

function App() {
    return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<Main />}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ConfigProvider>
    );
}

export default App;
