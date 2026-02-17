import {
  Card,
  Typography,
  CardContent,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import PostPreview from "../components/PostPreview";
import Comment from "../components/Comment";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/post/${id}`, {
          headers: { Authorization: `${token}` },
        });

        const postData = await res.json();
        setPost(postData);
        setComments(postData.comments);

        console.log(postData);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleComment = async () => {
    if (comment.trim().length === 0) {
      setCommentError("Comment cannot be empty");
      return;
    }

    setCommentError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          post_id: post.post_id,
          content: comment,
        }),
      });

      const newComment = await res.json();

      // Add comment to UI immediately
      setComments((prev) => [newComment, ...prev]);
      setComment("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  if (loading) return <div style={{ color: "white" }}>Loading posts...</div>;

  return (
    <Card sx={{ width: "50vw" }}>
      <CardContent>
        <Typography variant="body2" color="gray" mb={2}>
          {post.username} •{" "}
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </Typography>
        <Typography variant="h4" align="left" mb={2}>
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          mb={1}
          sx={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {post.body}
        </Typography>

        <Stack direction={"row"} align="left" spacing={1} mb={2}>
          <Button
            startIcon={<FavoriteBorderOutlinedIcon />}
            sx={{ borderRadius: "15px", textTransform: "none", color: "white" }}
          >
            123
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

        <Stack direction={"row"} spacing={1}>
          <TextField
            label="Add a Comment"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (commentError) setCommentError(""); // clear while typing
            }}
            error={!!commentError}
            helperText={commentError}
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
            onClick={handleComment}
            sx={{ borderRadius: 3, bgcolor: "#3491ff", flex: 1 }}
          >
            Post
          </Button>
        </Stack>
      </CardContent>
      <Stack>
        {comments.map((comment) => (
          <Comment
            key={comment.comment_id}
            user_id={comment.user_id}
            content={comment.content}
            timestamp={comment.created_at}
          />
        ))}
      </Stack>
    </Card>
  );
}

export default PostPage;
