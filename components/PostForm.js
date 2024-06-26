import { useState } from 'react';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) formData.append('image', image);

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setContent('');
        setImage(null);
        onPostCreated();
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;