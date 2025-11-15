import express from 'express';

import { authenticate } from '../middleware/authenticate.js';

import { authorizeRoles } from '../middleware/authorizeRoles.js';

import {
  getAllMembersHandler,
  getMemberByIdHandler,
  createMemberHandler,
  updateMemberHandler,
  deleteMemberHandler,
  getMemberClubsHandler
} from '../controllers/memberController.js';


const router = express.Router();



// GET /api/members                  returns all club members (auth)
router.get('/', authenticate, getAllMembersHandler);

// GET /api/members/:id             get member by ID (auth)
router.get('/:id', authenticate, getMemberByIdHandler);

// POST /api/members                sigup a new club member (API_ADMIN only)
router.post('/', authenticate, authorizeRoles('API_ADMIN'), createMemberHandler);

// PUT /api/members/:id              update a club member by ID (API_ADMIN only)
router.put('/:id', authenticate, authorizeRoles('API_ADMIN'), updateMemberHandler);

// DELETE /api/members/:id           remove a club member by ID (API_ADMIN only)
router.delete('/:id', authenticate, authorizeRoles('API_ADMIN'), deleteMemberHandler);

// GET /api/members/:id/clubs      returns clubs a member has joined (auth)
router.get('/:id/clubs', authenticate, getMemberClubsHandler);




export default router;