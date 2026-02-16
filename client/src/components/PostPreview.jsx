import {
  Card,
  Typography,
  CardContent,
  CardActionArea,
  Stack,
  Button,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

function PostPreview({ title, body, timestamp, user_id, post_id }) {
  const navigate = useNavigate();

  const [comments, setComments] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleCardClick = () => {
    navigate(`/post/${post_id}`);
  };

  const handleLike = async (e) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          post_id: post_id,
        }),
      });

      const newLike = await res.json();
      setLiked(newLike.liked);
      setLikeCount((prev) => (newLike.liked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const [username, setUsername] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const resUser = await fetch(
          `${import.meta.env.VITE_API_URL}/user/${user_id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );

        const userData = await resUser.json();
        setUsername(userData.username);
        const resComment = await fetch(
          `${import.meta.env.VITE_API_URL}/comment/post/${post_id}`,
          {
            headers: { Authorization: `${token}` },
          },
        );
        const commentData = await resComment.json();
        setComments(commentData);

        const resLikes = await fetch(
          `${import.meta.env.VITE_API_URL}/like/post/${post_id}`,
          {
            headers: { Authorization: `${token}` },
          },
        );
        const likeData = await resLikes.json();
        setLikeCount(likeData.likeCount);
        setLiked(likeData.liked);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    getUser();
  }, [user_id]);

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardActionArea component="div" onClick={handleCardClick}>
        <CardContent variant="subtitle2">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2" color="gray">
              {username} •{" "}
              {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
            </Typography>
          </Stack>
          <Typography variant="h6" align="left" mb={1}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            align="left"
            mb={1}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {body}
          </Typography>

          <Stack direction={"row"} align="left" spacing={1}>
            <Button
              onClick={handleLike}
              startIcon={
                liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />
              }
              sx={{
                borderRadius: "15px",
                textTransform: "none",
                color: liked ? "#ff3042" : "white",
              }}
            >
              {likeCount}
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{ color: "white" }}
            >
              <AddCommentOutlinedIcon fontSize="small" />
              <Typography variant="button">{comments.length}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostPreview;
