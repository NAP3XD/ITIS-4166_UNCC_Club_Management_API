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

router.get('/', authenticate, authorizeRoles('admin'), getAllUsersHandler);

router.get('/:id', authenticate, authorizeRoles('admin', 'user'), getUserByIdHandler);

router.get('/me', authenticate, getMyProfileHandler);

router.post('/users', authenticate, authorizeRoles('admin'), createUserHandler);

router.put('/:id', authenticate, authorizeRoles('admin', 'user'), updateUserHandler);

router.put('/me', authenticate, updateMyProfileHandler);

router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUserHandler);

export default router;