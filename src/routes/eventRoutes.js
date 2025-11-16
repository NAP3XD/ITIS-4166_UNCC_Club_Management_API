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



import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// event routes
router.get('/', validateEventQuery, getAllEventsHandler);

router.get('/:id', validateEventId, getEventByIdHandler);

router.post('/', authenticate, validateCreateEvent, createEventHandler);

router.put('/:id', validateEventId, authenticate, validateUpdateEvent, updateEventHandler);

router.delete('/:id', authenticate, validateEventId, deleteEventHandler);

// RSVP routes
router.post('/:id/rsvp', validateEventId, authenticate, validateRSVP, createRSVPHandler);

router.put('/:id/rsvp', validateEventId, authenticate, validateRSVP, updateRSVPHandler);

router.delete('/:id/rsvp', validateEventId, authenticate, deleteRSVPHandler);

export default router;
