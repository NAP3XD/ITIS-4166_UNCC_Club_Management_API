import {
  getAllAnnouncements,
  getAnnouncementById,
  makeAnnouncement,
  updateTheAnnouncement,
  deleteAnnouncement
} from '../services/announcementService.js';

// GET /announcement
export async function getAllAnnouncementsHandler(req, res) {
  try {
    const filter = {};
    if (req.query.clubId) {
      filter.clubId = Number(req.query.clubId);
    }

    const announcements = await getAllAnnouncements(filter);
    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: error.message });
  }
}

// GET /announcement/:id
export async function getAnnouncementByIdHandler(req, res) {
  try {
    const announcement = await getAnnouncementById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json(announcement);
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({ error: error.message });
  }
}

// POST /announcement
export async function createAnnouncementHandler(req, res) {
  try {
    const newAnnouncement = await makeAnnouncement(req.body);
    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: error.message });
  }
}

// PUT /announcement/:id
export async function updateAnnouncementHandler(req, res) {
  try {
    const updatedAnnouncement = await updateTheAnnouncement(req.params.id, req.body);
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ error: error.message });
  }
}

// DELETE /announcement/:id
export async function deleteAnnouncementHandler(req, res) {
  try {
    const deletedAnnouncement = await deleteAnnouncement(req.params.id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(204).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ error: error.message });
  }
}
