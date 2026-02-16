


import {Container, Toolbar, Typography, Box, Stack} from "@mui/material";
import Navbar from '../components/Navbar';
import { Outlet } from "react-router-dom";

function MainLayout() {

  return (

    <>
      <Navbar />
      <Toolbar/>

      <Container>
       <Outlet /> 
      </Container> 
        
   </>
  )
}

export default MainLayout
