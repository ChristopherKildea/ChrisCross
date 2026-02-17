import { Stack, Divider } from "@mui/material";
import PostPreview from "../components/PostPreview";
import { useState, useEffect } from "react";

function Homepage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div style={{ color: "white" }}>Loading posts...</div>;

  return (
    <Stack
      width="50vw"
      spacing={0.75}
      divider={<Divider sx={{ borderColor: "white", width: "100%" }} />}
    >
      {posts.map((post) => (
        <PostPreview key={post.post_id} post={post} />
      ))}
    </Stack>
  );
}

export default Homepage;
