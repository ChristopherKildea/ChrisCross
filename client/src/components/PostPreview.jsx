
import { Card, Typography, CardContent, CardActionArea, Stack, Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

function PostPreview({ title, body, timestamp, user_id, post_id }) {

    const navigate = useNavigate(); 

    const handleCardClick = () => {
      navigate(`/post/${post_id}`);
    };
    
    const handleLike = (e) => {
        e.stopPropagation(); 
        console.log("clicked like")
    }

  const [username, setUsername] = useState([]);

    useEffect(() => {
      const getUser = async () => {
        try {

          const token = localStorage.getItem("token");
          const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${user_id}`, {
            headers: {
              Authorization: `${token}`,
            },
          });

          const data = await res.json();

          setUsername(data.username);
        } catch (err) {
          console.error("Failed to fetch posts:", err);
        }
      };

      getUser();
    }, [user_id]);

    return ( 
        <Card sx={{borderRadius: 3}}>
            <CardActionArea component="div" onClick={handleCardClick}>
                <CardContent variant="subtitle2"> 
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle2" color="gray">
                        {username} • {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                        </Typography>
                    </Stack>
                    <Typography variant="h6" align='left' mb={1}>{title}</Typography>
                    <Typography variant="body2" align='left' mb={1} sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                    }}>
                        {body}
                    
                    </Typography>

                    <Stack direction={"row"} align='left' spacing={1}>
                        <Button onClick={handleLike} startIcon={<FavoriteBorderOutlinedIcon /> } 
                            sx={{ borderRadius: "15px", textTransform: "none", color: "white" }}
                        >
                            123
                        </Button>

                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{color: "white"}}>
                            <AddCommentOutlinedIcon fontSize="small"/>
                            <Typography variant="button">123</Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}


export default PostPreview