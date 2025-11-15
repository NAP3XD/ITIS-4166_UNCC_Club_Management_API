import prisma from '../config/db.js';

export async function findAllAnnouncements(filter = {}) {
  return prisma.clubAnnouncement.findMany();
    
}

export async function findAnnouncementById(id) {
  return prisma.clubAnnouncement.findUnique({
    where: { id: Number(id) },
  });
}

export async function createAnnouncement(data) {
  return prisma.clubAnnouncement.create({
    data: {
      clubId: Number(data.clubId),
      title: data.title,
      content: data.content,
    },
  });
}

export async function updateAnnouncement(id, data) {
  return prisma.clubAnnouncement.update({
    where: { id: Number(id) },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.content && { content: data.content }),
    },
  });
}

export async function removeAnnouncement(id) {
  return prisma.clubAnnouncement.delete({
    where: { id: Number(id) },
  });
}
