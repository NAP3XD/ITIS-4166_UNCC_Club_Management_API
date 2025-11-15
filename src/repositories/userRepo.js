import prisma from "../config/db.js";

export async function findAllUser() {
  return await prisma.user.findMany({
    omit: { password: true }
  });
}

export async function findUserById(userId) {
  return await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true }
  });
}

export async function createUser(userData) {
  const newUser = await prisma.user.create({
    data: userData
  });
  return newUser;
}

export async function insertUser(userData) {
  return await prisma.user.create({
    data: userData
  });
}

export async function modifyUser(userId, userData) {
  return await prisma.user.update({
    where: { id: userId },
    data: userData
  });
}

export async function removeUser(userId) {
  return await prisma.user.delete({
    where: { id: userId }
  });
}