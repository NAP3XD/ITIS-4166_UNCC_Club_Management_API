import express from 'express';

import {
  validateAnnouncementId,
  validateAnnouncementQuery,
  validateCreateAnnouncement,
  validateUpdateAnnouncement,
} from '../validation/announcementValidator.js';

import {
  getAllAnnouncementsHandler,
  getAnnouncementByIdHandler,
  createAnnouncementHandler,
  updateAnnouncementHandler,
  deleteAnnouncementHandler,
} from '../controllers/announcementController.js';

import { authenticate } from '../middleware/authenticate.js';
// import { authorizeAnnouncementPermission } from '../middleware/authorizeAnnouncementPermission.js';

const router = express.Router();

// routes for announcements
router.get('/', validateAnnouncementQuery, getAllAnnouncementsHandler);

router.get('/:id', validateAnnouncementId, getAnnouncementByIdHandler);

router.post('/', authenticate, validateCreateAnnouncement, createAnnouncementHandler);

router.put('/:id', validateAnnouncementId, authenticate, validateUpdateAnnouncement, updateAnnouncementHandler);

router.delete('/:id', authenticate, validateAnnouncementId, deleteAnnouncementHandler);

export default router;
