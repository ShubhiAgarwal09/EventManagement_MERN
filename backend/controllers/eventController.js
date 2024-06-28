const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { title, description, date, location, banner, maxAttendees, host } = req.body;
  try {
    const event = new Event({ title, description, date, location, banner, maxAttendees, host });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Error creating event' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('attendees', 'username');
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching events' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'username');
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: 'Event not found' });
  }
};
