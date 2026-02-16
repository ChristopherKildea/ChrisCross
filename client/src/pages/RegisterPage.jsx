
import { Link, Card, Typography, CardContent, InputAdornment, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";



function RegisterPage() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
      console.log("Register!")
    }

    return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",     
        minHeight: "100vh",       
        p: 2,                     
      }}
    >
      <Card
        sx={{
          width: 350,
          borderRadius: 3,
          p: 2,
          bgcolor: "white"
        }}
      >
        <CardContent
        component="form">
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 3, fontWeight: "bold", color: "black" }}
          >
            Register
          </Typography>

          {/* Username */}
          <TextField
            fullWidth
            placeholder="Username"
            variant="outlined"
            sx={{ mb: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              )
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            type="password"
            placeholder="Password"
            variant="outlined"
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "black",
              "&:hover": { bgcolor: "#222" },
              mb: 2,
              color: "white"
            }}
            onClick={handleRegister}
          >
            Register
          </Button>

          {/* Signup Link */}
          <Typography align="center" variant="body2">
            <Link href="/login" underline="hover" color="#006fee">
              Not a member? Log in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
    )

}


export default RegisterPage
