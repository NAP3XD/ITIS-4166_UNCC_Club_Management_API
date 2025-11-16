import {
  findAllAnnouncements,
  findAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  removeAnnouncement
} from '../repositories/announcementRepo.js';

export async function getAllAnnouncements(filter = {}) {
  return await findAllAnnouncements(filter);
}

export async function getAnnouncementById(id) {
  return await findAnnouncementById(id);
}

export async function makeAnnouncement(data) {
  return await createAnnouncement(data);
}

export async function updateTheAnnouncement(id, data) {
  return await updateAnnouncement(id, data);
}

export async function deleteAnnouncement(id) {
  return await removeAnnouncement(id);
}
