import { useState } from 'react'
import './App.css'
import {Box,CssBaseline,Container, Stack, Divider, Button, Typography, AppBar, Toolbar, ThemeProvider} from "@mui/material";
import PostPreview from './components/PostPreview';
import theme from './components/Theme';
import Navbar from './components/Navbar';

function App() {


  return (

    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Toolbar />

      <Container>
        
        <Stack 
          width="50vw" 
          spacing={.75}
          divider={<Divider sx={{ borderColor: "white", width: "100%" }} />}
        >

          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
          
        </Stack>
      </Container>
    </ThemeProvider>
  
    </>
  )
}

export default App
