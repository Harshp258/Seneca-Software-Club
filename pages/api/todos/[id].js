import dbConnect from '../../../lib/mongodb';
import Todo from '../../../models/Todo';
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
        const todo = await Todo.findOne({ _id: id, user: session.user.id });
        if (!todo) {
          return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, todo });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const todo = await Todo.findOneAndUpdate(
          { _id: id, user: session.user.id },
          req.body,
          { new: true }
        );
        if (!todo) {
          return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, todo });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const todo = await Todo.findOneAndDelete({ _id: id, user: session.user.id });
        if (!todo) {
          return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, message: 'Todo deleted successfully' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}