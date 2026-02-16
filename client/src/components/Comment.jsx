
import { Card, Typography, CardContent, CardActionArea, Stack, Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";



function Comment({ user_id, content, timestamp }) {

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

            <CardContent variant="subtitle2"> 
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2" color="gray">
                    {username} • {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                    </Typography>
                </Stack>
                <Typography variant="body2" align='left' mb={1} sx={{
       
                }}>
                {content}
                </Typography>
            </CardContent>
        </Card>
    );

}


export default Comment