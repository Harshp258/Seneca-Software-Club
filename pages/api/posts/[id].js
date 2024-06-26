import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const post = await Post.findById(id).populate('user', 'name');
        if (!post) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, post });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }
        if (post.user.toString() !== session.user.id) {
          return res.status(403).json({ success: false, message: 'Not authorized to update this post' });
        }
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, post: updatedPost });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }
        if (post.user.toString() !== session.user.id) {
          return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}