import {
  findAllEvents,
  findEventById,
  createEvent,
  updateEvent,
  removeEvent,
  createRSVP,
  updateRSVP,
  removeRSVP,
  findRSVPByUserAndEvent
} from '../repositories/eventRepo.js';

export async function getAllEvents(filter = {}) {
  return await findAllEvents(filter);
}

export async function getEventById(id) {
  return await findEventById(id);
}

export async function makeEvent(data) {
  return await createEvent(data);
}

export async function updateTheEvent(id, data) {
  return await updateEvent(id, data);
}

export async function deleteEvent(id) {
  return await removeEvent(id);
}

// RSVP  service functions
export async function addRSVP(data) {
  return await createRSVP(data);
}

export async function modifyRSVP(userId, eventId, status) {
  return await updateRSVP(userId, eventId, status);
}

export async function deleteRSVP(userId, eventId) {
  return await removeRSVP(userId, eventId);
}

export async function getRSVPByUserAndEvent(userId, eventId) {
  return await findRSVPByUserAndEvent(userId, eventId);
}
