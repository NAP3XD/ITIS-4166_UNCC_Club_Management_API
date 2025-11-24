import express from 'express';


import {
  validateEventId,
  validateEventQuery,
  validateCreateEvent,
  validateUpdateEvent,
  validateRSVP,
} from '../middleware/eventValidator.js';


import {
  getAllEventsHandler,
  getEventByIdHandler,
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
  createRSVPHandler,
  updateRSVPHandler,
  deleteRSVPHandler,
} from '../controllers/eventController.js';
import {
  verifyClubMembershipHandler,
} from '../controllers/clubController.js';
import {
  authorizeRoles,
} from '../middleware/authorizeRoles.js';


import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// event routes
router.get('/', validateEventQuery, getAllEventsHandler);

router.get('/:id', validateEventId, getEventByIdHandler);

router.post('/', authenticate, authorizeRoles('API_ADMIN', 'CLUB_ADMIN'), verifyClubMembershipHandler,validateCreateEvent, createEventHandler);

router.put('/:id',  authenticate, authorizeRoles('API_ADMIN', 'CLUB_ADMIN'), verifyClubMembershipHandler, validateEventId, validateUpdateEvent, updateEventHandler);

router.delete('/:id', authenticate, authorizeRoles('API_ADMIN', 'CLUB_ADMIN'), verifyClubMembershipHandler, validateEventId, deleteEventHandler);
// RSVP routes
router.post('/:id/rsvp', validateEventId, authenticate, verifyClubMembershipHandler, validateRSVP, createRSVPHandler);

router.put('/:id/rsvp', validateEventId, authenticate, verifyClubMembershipHandler, validateRSVP, updateRSVPHandler);

router.delete('/:id/rsvp', validateEventId, authenticate, verifyClubMembershipHandler, deleteRSVPHandler);
export default router;
