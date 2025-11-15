import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  findUserByEmailWithPassword,
  createUser,
  findUserById
} from '../repositories/authRepo.js';




const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d'; // jwt 7 day limit

  // logs in current  user 
export async function loginUser(email, password) {

  const user = await findUserByEmailWithPassword(email);
  
  if (!user) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }
  

  const token = generateToken(user.id, user.role);
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    token,
    user: userWithoutPassword
  };
}

// new member signUp
export async function registerUser(userData) {
  // createUser fun checks for unique emial
  const existingUser = await findUserByEmailWithPassword(userData.email);
  
  if (existingUser) {
    const error = new Error('Email already exists');
    error.status = 409;
    throw error;
  }
  
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  
  const newUser = await createUser({
    email: userData.email,
    password: hashedPassword,
    name: userData.name,
    role: userData.role || 'CLUB_MEMBER'
  });
  
  // creates a new bearer token
  const token = generateToken(newUser.id, newUser.role);
  return {
    token,
    user: newUser
  };
}

// jwt veri w/ error handling 
export async function verifyToken(token) {
  try {
   
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    const user = await findUserById(userId);
    return user;

  } catch (error) {
    if (error.name === 'JWTError') {
      const err = new Error('Invalid token');
      err.status = 401;
      throw err;
    }
    if (error.name === 'TokenExpiredError') {
      const err = new Error('Token expired');
      err.status = 401;
      throw err;
    }
    throw error;
  }
}


export function generateToken(userId, userRole) {
  const payload = {
    userId,
    role: userRole
  };
  
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
  return token;
}