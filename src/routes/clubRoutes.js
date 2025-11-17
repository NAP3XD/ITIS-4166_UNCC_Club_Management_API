import express from 'express';

import {
  validateClubId,
  validateClubQuery,
  validateCreateClub,
  validateUpdateClub,
  validateRemoveMember,
} from '../middleware/clubValidator.js';

import {
  getAllClubsHandler,
  getClubByIdHandler,
  createClubHandler,
  updateClubHandler,
  deleteClubHandler,
  joinClubHandler,
  leaveClubHandler,
  getClubMembersHandler,
  getMyClubsHandler,
  removeMemberHandler,
} from '../controllers/clubController.js';

import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// club routes
router.get('/', validateClubQuery, getAllClubsHandler);

router.get('/my-clubs', authenticate, getMyClubsHandler);

router.get('/:id', validateClubId, getClubByIdHandler);

router.post('/', authenticate, validateCreateClub, createClubHandler);

router.put('/:id', validateClubId, authenticate, validateUpdateClub, updateClubHandler);

router.delete('/:id', authenticate, validateClubId, deleteClubHandler);

// membership routes
router.post('/:id/join', validateClubId, authenticate, joinClubHandler);

router.delete('/:id/leave', validateClubId, authenticate, leaveClubHandler);

router.get('/:id/members', validateClubId, getClubMembersHandler);

router.delete('/:id/members/:userId', authenticate, validateRemoveMember, removeMemberHandler);

export default router;
