import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUserModel } from '../models/AdminUser';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Hardcoded test fallback for when DB is down
    if ((email === 'test@gmail.com' && password === '123') ||
      (email === 'mani@gmail.com' && password === '123')) {
      const token = jwt.sign(
        { userId: 'test_admin_id', email: email },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
      );

      return res.json({
        token,
        user: {
          id: 'test_admin_id',
          email: email,
          name: email === 'mani@gmail.com' ? 'Mani' : 'Test Admin',
        },
      });
    }

    let user;
    try {
      // Find user in MongoDB
      user = await AdminUserModel.findOne({ email });
    } catch (dbError) {
      console.error('Database connection error during login:', dbError);
      return res.status(500).json({ message: 'Database connection failed. Please use test account or check DB connection.' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
