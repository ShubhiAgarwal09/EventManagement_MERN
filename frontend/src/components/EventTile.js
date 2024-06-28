import React from 'react';
import { Link } from 'react-router-dom';

const EventTile = ({ event }) => {
  return (
    <div className="event-tile" >
      <img src={event.banner} alt={event.title} style={{ width: '100%', height: '200px', marginTop: '50px' }} />
      <div style={{textAlign: 'center'}}>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>{new Date(event.date).toLocaleDateString()}</p>
        <p>{event.location}</p>
        <Link style={{marginTop: '10px', textDecoration: 'none', padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px'}} to={`/events/${event._id}`}>View Event</Link>
      </div>
    </div>
  );
};

export default EventTile;
