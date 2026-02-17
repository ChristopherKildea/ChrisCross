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

function PostPreview({ post }) {
  const navigate = useNavigate();

  const [likeCount, setLikeCount] = useState(Number(post.like_count));
  const [liked, setLiked] = useState(post.has_liked);

  const handleCardClick = () => {
    navigate(`/post/${post.post_id}`);
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
          post_id: post.post_id,
        }),
      });

      const newLike = await res.json();
      setLiked(newLike.liked);
      setLikeCount((prev) => (newLike.liked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardActionArea component="div" onClick={handleCardClick}>
        <CardContent variant="subtitle2">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2" color="gray">
              {post.username} •{" "}
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </Typography>
          </Stack>
          <Typography variant="h6" align="left" mb={1}>
            {post.title}
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
            {post.body}
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
              <Typography variant="button">{post.comment_count}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostPreview;
