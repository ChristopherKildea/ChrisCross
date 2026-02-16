
import { Card, Typography, CardContent, TextField, Stack, Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import PostPreview from "../components/PostPreview";
import Comment from "../components/Comment";

function PostPage() {

    return (
        <Card sx={{ width: "50vw" }} >
            <CardContent>
                <Typography variant="body2" color="gray" mb={2}>
                Chris • 02/13/2026
                </Typography>
                <Typography variant="h4" align='left' mb={2}>Title</Typography>
                <Typography variant="body2" mb={1}   sx={{
                    wordBreak: "break-word",  
                    overflowWrap: "break-word", 
                }}> 
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </Typography>


                <Stack direction={"row"} align='left' spacing={1} mb={2}>
                    <Button startIcon={<FavoriteBorderOutlinedIcon /> } 
                        sx={{ borderRadius: "15px", textTransform: "none", color: "white" }}
                    >
                        123
                    </Button>

                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{color: "white"}}>
                        <AddCommentOutlinedIcon fontSize="small"/>
                        <Typography variant="button">123</Typography>
                    </Stack>
 
                </Stack>

                <Stack direction={"row"} spacing={1}>
                    <TextField
                        label="Add a Comment"
                        fullWidth
                        variant="outlined"
                        sx={{
                            flex: 6,
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
                    <Button
                     sx={{ borderRadius: 3, bgcolor: "#3491ff", flex: 1 }}>
                        Post
                    </Button>
                </Stack>
            </CardContent>
            <Stack>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
            </Stack>

        </Card>
    )

}


export default PostPage
