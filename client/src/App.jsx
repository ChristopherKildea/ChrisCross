import { useState } from 'react'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from './components/Theme';
import MainLayout from './layouts/MainLayout'
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Homepage from './pages/Homepage'
import CreatePage from './pages/Createpage';
import './App.css'
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthLayout from './layouts/AuthLayout'

function App() {


  return (
    // TODO: Fix routes
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route 
              path="/" 
              element={<Homepage />}
            />
          </Route>

          <Route element={<MainLayout />}>
            <Route 
              path="/create" 
              element={<CreatePage />}
            />
          </Route>

          <Route element={<MainLayout />}>
            <Route 
              path="/post" 
              element={<PostPage />}
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route 
              path="/login" 
              element={<LoginPage />}
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route 
              path="/register" 
              element={<RegisterPage />}
            />
          </Route>
          
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
