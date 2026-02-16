import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [titleHelper, setTitleHelper] = useState("");
  const [bodyHelper, setBodyHelper] = useState("");
  const navigate = useNavigate();

  const handlePost = async () => {
    if (title.trim().length === 0 || body.trim().length === 0) {
      if (title.trim().length === 0) {
        setTitleError(true);
        setTitleHelper("Title cannot be empty");
      } else {
        setTitleError(false);
        setTitleHelper();
      }

      if (body.trim().length === 0) {
        setBodyError(true);
        setBodyHelper("Body cannot be empty");
      } else {
        setBodyError(false);
        setBodyHelper("");
      }

      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          title: title,
          body: body,
        }),
      });

      const data = await res.json();

      // Clear inputs
      setTitle("");
      setBody("");

      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <Card sx={{ width: "40vw" }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }} align="left">
          Create post
        </Typography>

        <Stack spacing={4}>
          <TextField
            required
            label="Title"
            fullWidth
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            error={titleError}
            helperText={titleHelper}
            sx={{
              mb: 2,
              input: { color: "white" },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.4)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4dabf5",
                },
              },
            }}
          />

          <TextField
            required
            label="Body"
            fullWidth
            multiline
            minRows={6}
            variant="outlined"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            error={bodyError}
            helperText={bodyHelper}
            sx={{
              textarea: { color: "#B8BBBE" },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.4)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4dabf5",
                },
              },
            }}
          />
        </Stack>
        <Button
          onClick={handlePost}
          sx={{ display: "block", ml: 0, mt: 2, bgcolor: "#3491ff" }}
        >
          Post
        </Button>
      </CardContent>
    </Card>
  );
}

export default CreatePage;
