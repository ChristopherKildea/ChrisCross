

import { Card, Container, Typography, CardContent, TextField, Stack, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';


function AuthLayout() {
    // auth navbar
    // login page or register page (outlet)

  return (
    
      <Container>
       <Outlet /> 
      </Container> 
  );


}

export default AuthLayout;
