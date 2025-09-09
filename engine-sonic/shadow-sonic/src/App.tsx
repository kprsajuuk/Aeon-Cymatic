import { useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import routes from './router/router';
import Header from "@/pages/Header/Header";
import Login from "@/pages/User/Login";
//import logo from './assets/img/logo.png';
import style from './App.module.scss';

function App() {
    return (
        <>
            <div className={style.origin}>
                <BrowserRouter>
                    {PlatformApp()}
                </BrowserRouter>
            </div>
        </>
    )
}
//test
export default App

function PlatformApp(){
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/cymatic/*" element={
                <div className={style.main}>
                    <div className={style.header} >
                        <Header />
                        {/* <Navigator/> */}
                    </div>
                    <div className={style.content}>
                      <Routes>
                          {routes.map((route, index) => (
                              <Route key={index} path={route.path} element={route.element} />
                          ))}
                      </Routes>
                    </div>
                </div>
            } />
            {/* <Route path="/*" element={<Navigate to="/code/asset/project" replace />} /> */}
            <Route path="/*" element={<Navigate to="/cymatic/test/a" replace />} />
        </Routes>
    )
}