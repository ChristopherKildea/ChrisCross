import {
  Box,
  CssBaseline,
  Container,
  Stack,
  Divider,
  Button,
  Typography,
  AppBar,
  Toolbar,
  ThemeProvider,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleCreate = (e) => {
    navigate("/create"); // go to create post page
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h5"
          onClick={() => navigate("/")}
          sx={{ fontWeight: "bold", cursor: "pointer" }}
        >
          ChrisCross
        </Typography>
        <Stack direction="row" sx={{ marginLeft: "auto" }}>
          {/* TODO: CREATE PROFILE ICON HERE */}
          <Button onClick={handleCreate} startIcon={<AddBoxOutlinedIcon />}>
            Create
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
