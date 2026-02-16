
import {Typography, Box, Card, CardContent, TextField, Stack, Button} from "@mui/material";
import { useState } from "react";

function CreatePage() {


    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [titleHelper, setTitleHelper] = useState("")
    const [bodyHelper, setBodyHelper] = useState("")


    return (
   
        <Card sx={{ width: "40vw"}}>
            <CardContent>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, mb: 3 }}
                    align="left"
          
                >
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
                            color: "white"
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
                <Button sx={{ display: "block", ml: 0, mt: 2, bgcolor:"#3491ff" }}>Post</Button> 
            </CardContent>
            

        </Card>
    
    )

}


export default CreatePage
