import {
  getAllClubs,
  getClubById,
  makeClub,
  updateTheClub,
  deleteClub,
  joinClub,
  leaveClub,
  getClubMembers,
  getUserClubs,
  removeMember
} from '../services/clubService.js';

export async function getAllClubsHandler(req, res) {
  try {
    const filter = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    filter.skip = (page - 1) * limit;
    filter.take = limit;

    const clubs = await getAllClubs(filter);
    res.status(200).json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function getClubByIdHandler(req, res) {
  try {
    const club = await getClubById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }
    res.status(200).json(club);
  } catch (error) {
    console.error('Error fetching club:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function createClubHandler(req, res) {
  try {
    const adminId = req.user.id;
    const newClub = await makeClub(req.body, adminId);
    res.status(201).json(newClub);
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function updateClubHandler(req, res) {
  try {
    const userId = req.user.id;
    const updatedClub = await updateTheClub(req.params.id, req.body, userId);
    if (!updatedClub) {
      return res.status(404).json({ error: 'Club not found' });
    }
    res.status(200).json(updatedClub);
  } catch (error) {
    console.error('Error updating club:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function deleteClubHandler(req, res) {
  try {
    const userId = req.user.id;
    const deletedClub = await deleteClub(req.params.id, userId);
    if (!deletedClub) {
      return res.status(404).json({ error: 'Club not found' });
    }
    res.status(204).json({ message: 'Club deleted successfully' });
  } catch (error) {
    console.error('Error deleting club:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function joinClubHandler(req, res) {
  try {
    const clubId = req.params.id;
    const userId = req.user.id; 
    const club = await getClubById(clubId);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    const membership = await joinClub(clubId, userId);
    res.status(201).json(membership);
  } catch (error) {
    console.error('Error joining club:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function leaveClubHandler(req, res) {
  try {
    const clubId = req.params.id;
    const userId = req.user.id; 

    const club = await getClubById(clubId);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    await leaveClub(clubId, userId);
    res.status(204).json({ message: 'Successfully left the club' });
  } catch (error) {
    console.error('Error leaving club:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function getClubMembersHandler(req, res) {
  try {
    // Support both path parameter and query parameter
    const clubId = req.params.id || req.query.clubId;
    
    if (!clubId) {
      return res.status(400).json({ error: 'Club ID is required' });
    }
    
    const members = await getClubMembers(clubId);
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching club members:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function getMyClubsHandler(req, res) {
  try {
    const userId = req.user.id;
    const clubs = await getUserClubs(userId);
    res.status(200).json(clubs);
  } catch (error) {
    console.error('Error fetching user clubs:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function removeMemberHandler(req, res) {
  try {
    const clubId = req.params.id;
    const memberIdToRemove = req.params.userId;
    const adminId = req.user.id;

    await removeMember(clubId, memberIdToRemove, adminId);
    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Error removing member:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function verifyClubMembershipHandler(req, res, next) {
  try {
    // Get clubId from params (for events/announcements/:id routes) or body (for create routes)
    const clubId = req.params.id || req.body.clubId;
    
    if (!clubId) {
      return res.status(400).json({ error: 'Club ID is required' });
    }
    
    const userId = req.user.id;
    const userRole = req.user.role;
    
    // Get the club to check admin status
    const club = await getClubById(clubId);
    
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }


    // API_ADMIN can access any club
    if (userRole === 'API_ADMIN') {
      return next();
    }
    

    
    // Check if user is the club's admin
    if (club.adminId === userId) {
      return next();
    }
    
    // Check if user is a member of the club
    const userClubs = await getUserClubs(userId);
    // getUserClubs returns membership objects with nested club property
    const isMember = userClubs.some(membership => membership.club.id === Number(clubId));
    

  } catch (error) {
    console.error('Error verifying club membership:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
