import {
  findAllClubs,
  findClubById,
  createClub,
  updateClub,
  removeClub,
  createMembership,
  removeMembership,
  findMembershipByUserAndClub,
  findClubMembers,
  findUserClubs
} from '../repositories/clubRepo.js';
import {
  getUserByIdHandler
} from '../controllers/userController.js';

export async function getAllClubs(filter = {}) {
  return await findAllClubs(filter);
}

export async function getClubById(id) {
  return await findClubById(id);
}

export async function makeClub(data, adminId) {
  if (!data.name) {
    throw new Error('Club name is required');
  }

  const club = await createClub({
    name: data.name,
    description: data.description || '',
    adminId: adminId,
  });

  await createMembership({
    clubId: club.id,
    userId: adminId,
  });

  return club;
}

export async function updateTheClub(id, data, userId) {
  const club = await findClubById(id);
  const user = await getUserByIdHandler(userId);
  if (!club) {
    throw new Error('Club not found');
  }

  if (user.role !== 'API_ADMIN' ) {
      if (club.adminId !== userId ) {
        throw new Error('Only the club admin can delete the club');
      }
  }

  return await updateClub(id, data);
}

export async function deleteClub(id, userId) {
  const club = await findClubById(id);
  const user = await getUserByIdHandler(userId);

  if (!club) {
    throw new Error('Club not found');
  }
  if (user.role !== 'API_ADMIN' ) {
      if (club.adminId !== userId ) {
        throw new Error('Only the club admin can delete the club');
      }
  }
  

  return await removeClub(id);
}

export async function joinClub(clubId, userId) {
  const club = await findClubById(clubId);
  if (!club) {
    throw new Error('Club not found');
  }

  const existingMembership = await findMembershipByUserAndClub(userId, clubId);
  if (existingMembership) {
    throw new Error('User is already a member of this club');
  }

  return await createMembership({
    clubId,
    userId,
  });
}

export async function leaveClub(clubId, userId) {
  const club = await findClubById(clubId);
  if (!club) {
    throw new Error('Club not found');
  }

  const membership = await findMembershipByUserAndClub(userId, clubId);
  if (!membership) {
    throw new Error('User is not a member of this club');
  }

  if (club.adminId === userId) {
    throw new Error('Club admin cannot leave the club. Transfer admin rights first.');
  }

  return await removeMembership(clubId, userId);
}

export async function getClubMembers(clubId) {
  const club = await findClubById(clubId);
  if (!club) {
    throw new Error('Club not found');
  }

  return await findClubMembers(clubId);
}

export async function getUserClubs(userId) {
  return await findUserClubs(userId);
}

export async function removeMember(clubId, memberIdToRemove, adminId) {
  const club = await findClubById(clubId);

  if (!club) {
    throw new Error('Club not found');
  }

  if (club.adminId !== adminId) {
    throw new Error('Only the club admin can remove members');
  }

  if (memberIdToRemove === adminId) {
    throw new Error('Admin cannot remove themselves. Use leave club instead.');
  }

  const membership = await findMembershipByUserAndClub(memberIdToRemove, clubId);
  if (!membership) {
    throw new Error('User is not a member of this club');
  }

  return await removeMembership(clubId, memberIdToRemove);
}