import React from 'react';
import EventTile from './EventTile';
import './EventList.css';
const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.map((event, index) => (
        <EventTile key={event._id} event={event} className={index % 2 === 0 ? 'event-tile-left' : 'event-tile-right'} />
      ))}
    </div>
  );
};

export default EventList;
