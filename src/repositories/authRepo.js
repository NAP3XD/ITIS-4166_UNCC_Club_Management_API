import prisma from '../config/db.js';



// get member by email (helper func for logIn)
export async function findUserByEmailWithPassword(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    return user;
  } catch (error) {
    throw new Error(`Can't find requested user in DB: ${error.message}`);
  }
}



// new member signUp
export async function createUser(data) {
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password, 
        name: data.name,
        role: data.role || 'CLUB_MEMBER'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return user;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Email already exists, Please choose another.');
      err.status = 409;
      throw err;
    }
    throw new Error(`Error while trying to create new Member: ${error.message}`);
  }
}



// get a user by ID for token verification
export async function findUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (!user) {
      const error = new Error('Member not found');
      error.status = 404;
      throw error;
    }
    
    return user;
  } catch (error) {
    if (error.status === 404) throw error;
    throw new Error(`Error while trying to find Member by ID: ${error.message}`);
  }
}