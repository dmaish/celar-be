import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../database/entities/user.entity';

export const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => bcrypt.hash(password, salt);

export const isPasswordValid = async (
  inputPassword: string, salt: string, hashedPassword: string
): Promise<boolean> => {
  console.log("isPasswordValid!========================================", inputPassword, salt, hashedPassword);

  const hashedInputPassword = await bcrypt.hash(inputPassword, salt);
  return hashedInputPassword === hashedPassword;

};

export const generateToken = async (user: User) => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not defined in environment variables');

  }
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, secret);
  return token;
}