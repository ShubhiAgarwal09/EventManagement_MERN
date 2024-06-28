import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from './EventList';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div style={{backgroundColor: '#f0f0f0'}}>
      <h1 style={{ textAlign: 'center', padding: '5px' }}>Upcoming Events</h1>
      <EventList events={events} />
    </div>
  );
};

export default Home;
