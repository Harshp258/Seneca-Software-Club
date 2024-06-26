import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import Post from '../components/Post';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  if (!session) return <p>Please sign in to view the feed.</p>;

  return (
    <Layout>
      <h1>Welcome to Seneca Software Club</h1>
      <PostForm onPostCreated={fetchPosts} />
      <div>
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </Layout>
  );
}