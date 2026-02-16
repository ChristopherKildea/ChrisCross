import { Typography } from "@mui/material";

function AuthHeader() {
  return (
    <Typography
      variant="h5"
      sx={{
        position: "absolute",
        top: 20,
        left: 30,
        color: "white",
        fontWeight: "bold",
      }}
    >
      ChrisCross.
    </Typography>
  );
}

export default AuthHeader;
