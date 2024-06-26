import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const posts = await Post.find().populate('user', 'name').sort({ createdAt: -1 });
      res.status(200).json({ success: true, posts });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { content, image } = req.body;
      const post = await Post.create({ user: session.user.id, content, image });
      res.status(201).json({ success: true, post });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}