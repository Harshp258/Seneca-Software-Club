import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const { name, course, studentId, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await User.create({ name, course, studentId, email, password: hashedPassword });
      res.status(201).json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}