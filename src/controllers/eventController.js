import {
  getAllEvents,
  getEventById,
  makeEvent,
  updateTheEvent,
  deleteEvent,
  addRSVP,
  modifyRSVP,
  deleteRSVP,
  getRSVPByUserAndEvent
} from '../services/eventService.js';

// GET /events
export async function getAllEventsHandler(req, res) {
  try {
    const filter = {};
    if (req.query.clubId) {
      filter.clubId = Number(req.query.clubId);
    }

    const events = await getAllEvents(filter);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: error.message });
  }
}

// GET /events/:id
export async function getEventByIdHandler(req, res) {
  try {
    const event = await getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: error.message });
  }
}

// POST /events
export async function createEventHandler(req, res) {
  try {
    const newEvent = await makeEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: error.message });
  }
}

// PUT /events/:id
export async function updateEventHandler(req, res) {
  try {
    const updatedEvent = await updateTheEvent(req.params.id, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: error.message });
  }
}

// DELETE /events/:id
export async function deleteEventHandler(req, res) {
  try {
    const deletedEvent = await deleteEvent(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: error.message });
  }
}

// POST /events/:id/rsvp
export async function createRSVPHandler(req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;  // reused from auth
    const { status } = req.body;

    // check for event
    const event = await getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    //  check for rsvp
    const existingRSVP = await getRSVPByUserAndEvent(userId, eventId);
    if (existingRSVP) {
      return res.status(409).json({ message: 'RSVP already exists. Use PUT to update.' });
    }

    const newRSVP = await addRSVP({
      userId,
      eventId,
      status: status || 'ATTENDING'
    });
    res.status(201).json(newRSVP);
  } catch (error) {
    console.error('Error creating RSVP:', error);
    res.status(500).json({ error: error.message });
  }
}

// PUT /events/:id/rsvp
export async function updateRSVPHandler(req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user.id; 
    const { status } = req.body;

    // check if event exists
    const event = await getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // check if RSVP exists
    const existingRSVP = await getRSVPByUserAndEvent(userId, eventId);
    if (!existingRSVP) {
      return res.status(404).json({ message: 'RSVP not found. Use POST to create.' });
    }

    const updatedRSVP = await modifyRSVP(userId, eventId, status);
    res.status(200).json(updatedRSVP);
  } catch (error) {
    console.error('Error updating RSVP:', error);
    res.status(500).json({ error: error.message });
  }
}

// DELETE /events/:id/rsvp
export async function deleteRSVPHandler(req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user.id; 

    // ceck if RSVP exists
    const existingRSVP = await getRSVPByUserAndEvent(userId, eventId);
    if (!existingRSVP) {
      return res.status(404).json({ message: 'RSVP not found' });
    }

    await deleteRSVP(userId, eventId);
    res.status(200).json({ message: 'RSVP deleted successfully' });
  } catch (error) {
    console.error('Error deleting RSVP:', error);
    res.status(500).json({ error: error.message });
  }
}
