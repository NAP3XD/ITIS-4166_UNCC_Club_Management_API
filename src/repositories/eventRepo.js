import prisma from '../config/db.js';

export async function findAllEvents(filter = {}) {
  const where = {};
  
  // filter clubId if provided
  if (filter.clubId) {
    where.clubId = Number(filter.clubId);
  }
  
  return prisma.event.findMany({
    where,
    include: {
      club: {
        select: {
          id: true,
          name: true,
        },
      },
      rsvps: {
        select: {
          id: true,
          userId: true,
          status: true,
        },
      },
    },
    orderBy: {
      eventDate: 'asc',
    },
  });
}

export async function findEventById(id) {
  return prisma.event.findUnique({
    where: { id: Number(id) },
    include: {
      club: {
        select: {
          id: true,
          name: true,
          adminId: true,
        },
      },
      rsvps: {
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
    },
  });
}

export async function createEvent(data) {
  return prisma.event.create({
    data: {
      clubId: Number(data.clubId),
      title: data.title,
      description: data.description,
      location: data.location,
      eventDate: new Date(data.eventDate),
    },
    include: {
      club: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function updateEvent(id, data) {
  const updateData = {};
  
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.eventDate !== undefined) updateData.eventDate = new Date(data.eventDate);
  
  return prisma.event.update({
    where: { id: Number(id) },
    data: updateData,
    include: {
      club: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function removeEvent(id) {
  return prisma.event.delete({
    where: { id: Number(id) },
  });
}

// RSVPfunctions
export async function createRSVP(data) {
  return prisma.eventRSVP.create({
    data: {
      userId: Number(data.userId),
      eventId: Number(data.eventId),
      status: data.status || 'ATTENDING',
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
}

export async function updateRSVP(userId, eventId, status) {
  return prisma.eventRSVP.update({
    where: {
      userId_eventId: {
        userId: Number(userId),
        eventId: Number(eventId),
      },
    },
    data: {
      status,
    },
  });
}

export async function removeRSVP(userId, eventId) {
  return prisma.eventRSVP.delete({
    where: {
      userId_eventId: {
        userId: Number(userId),
        eventId: Number(eventId),
      },
    },
  });
}

export async function findRSVPByUserAndEvent(userId, eventId) {
  return prisma.eventRSVP.findUnique({
    where: {
      userId_eventId: {
        userId: Number(userId),
        eventId: Number(eventId),
      },
    },
  });
}
