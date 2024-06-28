import React from 'react';
import { Link } from 'react-router-dom';

const EventTile = ({ event }) => {
  return (
    <div className="event-tile">
      <img src={event.banner} alt={event.title} />
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <Link to={`/events/${event._id}`}>View Event</Link>
    </div>
  );
};

export default EventTile;
