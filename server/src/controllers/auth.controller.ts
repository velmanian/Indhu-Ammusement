import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUserModel } from '../models/AdminUser';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user in MongoDB
    const user = await AdminUserModel.findOne({ email });

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
