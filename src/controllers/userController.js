import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../services/userService.js';

// GET /users
export async function getAllUsersHandler(req, res) {
  // Implementation for getting all users
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

// GET /users/:id
export async function getUserByIdHandler(req, res) {
  // Implementation for getting a user by ID
    try {
      const user = await getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

// GET /users/me
export async function getMyProfileHandler(req, res) {
  // Implementation for getting the authenticated user's profile
    try {
      const user = await getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

// POST /users
export async function createUserHandler(req, res) {
  // Implementation for creating a new user
    try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle specific error cases
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'User with this email already exists' });
      }
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

// PUT /users/:id
export async function updateUserHandler(req, res) {
  // Implementation for updating a user by ID
    try {
      const updatedUser = await updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

// PUT /users/me
export async function updateMyProfileHandler(req, res) {
  // Implementation for updating the authenticated user's profile
    try {
      const updatedUser = await updateUser(req.user.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
}

// DELETE /users/:id
export async function deleteUserHandler(req, res) {
  // Implementation for deleting a user by ID
    try {
      const deletedUser = await deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
