const RSVP = require('../models/RSVP');
const Event = require('../models/Event');

exports.rsvpEvent = async (req, res) => {
  const { eventId } = req.body;
  
  try {
    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
    console.log("Responseeee", res);
    const rsvp = new RSVP({ user: req.user.id, event: eventId });
    await rsvp.save();

    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { attendees: req.user.id } },
      { new: true }
    );

    res.status(201).json(rsvp);
  } catch (error) {
    console.error('Error RSVPing for event:', error);
    res.status(400).json({ error: 'Error RSVPing for event' });
  }
};


exports.cancelRsvp = async (req, res) => {
  const { eventId } = req.body;
  try {
    await RSVP.findOneAndDelete({ user: req.user.id, event: eventId });

    const event = await Event.findById(eventId);
    event.attendees.pull(req.user.id);
    await event.save();

    res.json({ message: 'RSVP cancelled' });
  } catch (error) {
    res.status(400).json({ error: 'Error cancelling RSVP' });
  }
};
