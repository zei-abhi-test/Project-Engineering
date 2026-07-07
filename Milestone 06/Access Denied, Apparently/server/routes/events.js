import express from 'express';
import { events } from '../data/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Protect all event routes
router.use(authMiddleware);

// GET / - Get all events the user is authorized to see
router.get('/', (req, res) => {
    const visibleEvents = events.filter(
        event =>
            event.creatorId === req.user.id ||
            event.invitedEmails.includes(req.user.email)
    );
    res.json(visibleEvents);
});

// POST / - Create a new event
router.post('/', (req, res) => {
    const { title, description, date, invitedEmails } = req.body;
    const newEvent = {
        id: Date.now().toString(),
        title,
        description,
        date,
        creatorId: req.user.id,
        invitedEmails: invitedEmails || [],
        rsvps: []
    };
    events.push(newEvent);
    console.log(`Invitations sent for event "${title}" to: ${newEvent.invitedEmails.join(', ')}`);
    res.status(201).json(newEvent);
});

// GET /:id - Get a single event if creator or invited
router.get('/:id', (req, res) => {
    const event = events.find(e => e.id === req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const isCreator = event.creatorId === req.user.id;
    const isInvited = event.invitedEmails.includes(req.user.email);

    if (!isCreator && !isInvited) {
        return res.status(403).json({ message: "Access denied" });
    }

    res.json({
        ...event,
        isCreator,
        isInvited
    });
});

// POST /:id/rsvp - RSVP to an event
router.post('/:id/rsvp', (req, res) => {
    const event = events.find(e => e.id === req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.invitedEmails.includes(req.user.email)) {
        return res.status(403).json({ message: "You are not invited to this event." });
    }

    if (event.rsvps.includes(req.user.id)) {
        return res.status(400).json({ message: "You have already RSVPed." });
    }

    event.rsvps.push(req.user.id);
    res.json({ message: 'RSVP successful', event });
});

// DELETE /:id - Delete an event (Creators only)
router.delete('/:id', (req, res) => {
    const index = events.findIndex(e => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Event not found' });

    // FIX: Check ownership BEFORE modifying the array
    if (events[index].creatorId !== req.user.id) {
        return res.status(403).json({ message: "Only the creator can delete this event." });
    }

    events.splice(index, 1);
    res.json({ message: 'Event deleted' });
});

export default router;
