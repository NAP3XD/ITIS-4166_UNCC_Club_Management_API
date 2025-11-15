import {
  findAllUser,
  findUserById,
  createUser,
  insertUser,
  modifyUser,
  removeUser
} from '../data/userRepo.js';

export async function getAllUsers() {
  return await findAllUser();
}

export async function getUserById(userId) {
  return await findUserById(userId);
}

export async function createUser(userData) {
  return await insertUser(userData);
}

export async function updateUser(userId, userData) {
  return await modifyUser(userId, userData);
}

export async function deleteUser(userId) {
  return await removeUser(userId);
}

export async function updateUser(userId, userData) {
  return await modifyUser(userId, userData);
}

export async function deleteUser(userId) {
  return await removeUser(userId);
}