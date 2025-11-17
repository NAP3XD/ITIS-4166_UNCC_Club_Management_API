import prisma from '../config/db.js';

export async function findAllClubs(filter = {}) {
  const skip = filter.skip || 0;
  const take = filter.take || 10;
  
  return prisma.club.findMany({
    skip,
    take,
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          members: true,
          events: true,
          announcements: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findClubById(id) {
  return prisma.club.findUnique({
    where: { id: Number(id) },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      _count: {
        select: {
          events: true,
          announcements: true,
        },
      },
    },
  });
}

export async function createClub(data) {
  return prisma.club.create({
    data: {
      name: data.name,
      description: data.description,
      adminId: Number(data.adminId),
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function updateClub(id, data) {
  const updateData = {};
  
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  
  return prisma.club.update({
    where: { id: Number(id) },
    data: updateData,
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function removeClub(id) {
  return prisma.club.delete({
    where: { id: Number(id) },
  });
}

export async function createMembership(data) {
  return prisma.clubMembership.create({
    data: {
      clubId: Number(data.clubId),
      userId: Number(data.userId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      club: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function removeMembership(clubId, userId) {
  return prisma.clubMembership.delete({
    where: {
      userId_clubId: {
        userId: Number(userId),
        clubId: Number(clubId),
      },
    },
  });
}

export async function findMembershipByUserAndClub(userId, clubId) {
  return prisma.clubMembership.findUnique({
    where: {
      userId_clubId: {
        userId: Number(userId),
        clubId: Number(clubId),
      },
    },
  });
}

export async function findClubMembers(clubId) {
  return prisma.clubMembership.findMany({
    where: { clubId: Number(clubId) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      joinedAt: 'desc',
    },
  });
}

export async function findUserClubs(userId) {
  return prisma.clubMembership.findMany({
    where: { userId: Number(userId) },
    include: {
      club: {
        include: {
          admin: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              members: true,
              events: true,
            },
          },
        },
      },
    },
    orderBy: {
      joinedAt: 'desc',
    },
  });
}