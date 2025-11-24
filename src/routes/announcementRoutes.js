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

import {
  verifyClubMembershipHandler,
} from '../controllers/clubController.js';

import {
  authorizeRoles,
} from '../middleware/authorizeRoles.js';

import { authenticate } from '../middleware/authenticate.js';
// import { authorizeAnnouncementPermission } from '../middleware/authorizeAnnouncementPermission.js';

const router = express.Router();

// routes for announcements
router.get('/', validateAnnouncementQuery, getAllAnnouncementsHandler);

router.get('/:id', validateAnnouncementId, getAnnouncementByIdHandler);

router.post('/', authenticate, authorizeRoles('API_ADMIN', 'CLUB_ADMIN'), verifyClubMembershipHandler, validateCreateAnnouncement, createAnnouncementHandler);

router.put('/:id', authenticate, authorizeRoles('API_ADMIN', 'CLUB_ADMIN'), verifyClubMembershipHandler, validateAnnouncementId, validateUpdateAnnouncement, updateAnnouncementHandler);

router.delete('/:id', authenticate, authorizeRoles('API_ADMIN', 'CLUB_ADMIN'), verifyClubMembershipHandler, validateAnnouncementId, deleteAnnouncementHandler);

export default router;
