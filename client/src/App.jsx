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
import ProtectedRoute from './components/ProtectedRoute';

function App() {


  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>



          {/* Auth pages (NO token required) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected app pages */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/post/:id" element={<PostPage />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
