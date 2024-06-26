import dbConnect from '../../../lib/mongodb';
import Todo from '../../../models/Todo';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const todos = await Todo.find({ user: session.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, todos });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const { text } = req.body;
        const todo = await Todo.create({ user: session.user.id, text });
        res.status(201).json({ success: true, todo });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}