import express from 'express';

import {
  validateAnnouncementId,
  validateAnnouncementQuery,
  validateCreateAnnouncement,
  validateUpdateAnnouncement,
} from '../middleware/announcementValidators.js';

import {
  getAllAnnouncementsHandler,
  getAnnouncementByIdHandler,
  createAnnouncementHandler,
  updateAnnouncementHandler,
  deleteAnnouncementHandler,
} from '../controllers/announcementController.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeAnnouncementPermission } from '../middleware/authorizeAnnouncementPermission.js';

const router = express.Router();

// routes for announcements
router.get('/', validateAnnouncementQuery, getAllAnnouncementsHandler);

router.get('/:id', validateAnnouncementId, getAnnouncementByIdHandler);

router.post('/', authenticate, validateCreateAnnouncement, authorizeAnnouncementPermission, createAnnouncementHandler);

router.put('/:id', validateAnnouncementId, authenticate, authorizeAnnouncementPermission, validateUpdateAnnouncement, updateAnnouncementHandler);

router.delete('/:id', authenticate, authorizeAnnouncementPermission, validateAnnouncementId, deleteAnnouncementHandler);

export default router;