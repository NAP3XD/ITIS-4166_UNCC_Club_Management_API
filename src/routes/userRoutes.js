import express from 'express';
import {
    getAllUsersHandler,
    getUserByIdHandler,
    getMyProfileHandler,
    createUserHandler,
    updateUserHandler,
    updateMyProfileHandler,
    deleteUserHandler
} from '../controllers/userController.js';
// Middleware imports
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

// Import validation middleware
import {
    validateUserId,
    validateCreateUser,
    validateUpdateUser,
    validateUpdateProfile
} from '../validation/userValidation.js';

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticate, authorizeRoles('API_ADMIN'), getAllUsersHandler);

// Get current user's profile
router.get('/me', authenticate, getMyProfileHandler);

// Get user by ID
router.get('/:id', validateUserId, authenticate, authorizeRoles('API_ADMIN', 'CLUB_MEMBER'), getUserByIdHandler);

// Create new user (Admin only)
router.post('/', validateCreateUser, authenticate, authorizeRoles('API_ADMIN'), createUserHandler);

// Update user by ID
router.put('/:id', validateUserId, validateUpdateUser, authenticate, authorizeRoles('API_ADMIN', 'CLUB_MEMBER'), updateUserHandler);

// Update current user's profile
router.put('/me', validateUpdateProfile, authenticate, updateMyProfileHandler);

// Delete user by ID (Admin only)
router.delete('/:id', validateUserId, authenticate, authorizeRoles('API_ADMIN'), deleteUserHandler);

export default router;
