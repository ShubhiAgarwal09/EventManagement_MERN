import React from 'react';
import EventTile from './EventTile';

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.map(event => (
        <EventTile key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
