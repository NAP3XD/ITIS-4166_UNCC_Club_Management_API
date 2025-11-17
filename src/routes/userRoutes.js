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
// Middleware imports -> still needs a userValidator.js for input validation
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// Example route: Get user profile

router.get('/', authenticate, authorizeRoles('API_ADMIN'), getAllUsersHandler);

router.get('/me', authenticate, getMyProfileHandler);

router.get('/:id', authenticate, authorizeRoles('API_ADMIN', 'CLUB_ADMIN'), getUserByIdHandler);

router.post('/users', authenticate, authorizeRoles('API_ADMIN'), createUserHandler);

router.put('/:id', authenticate, authorizeRoles('API_ADMIN', 'CLUB_ADMIN'), updateUserHandler);

router.put('/me', authenticate, updateMyProfileHandler);

router.delete('/:id', authenticate, authorizeRoles('API_ADMIN'), deleteUserHandler);

export default router;
