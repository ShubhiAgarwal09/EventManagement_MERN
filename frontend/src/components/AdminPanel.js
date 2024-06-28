import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [banner, setBanner] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [host, setHost] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      description,
      date,
      location,
      banner,
      maxAttendees,
      host: user.username
    };
    try {
      const response = await axios.post('http://localhost:5000/api/events/create', newEvent, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      console.log("Responseeee", response.status)
      if (response.status) {
        navigate(`/events/${response.data._id}`);
      }
    } catch (error) {
      console.error('Event creation error:', error);
    }
  };

  return (
    <div className="adminpanel-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit} className="adminpanel-form">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required></textarea>
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
        <input type="text" value={banner} onChange={e => setBanner(e.target.value)} placeholder="Banner URL" required />
        <input type="number" value={maxAttendees} onChange={e => setMaxAttendees(e.target.value)} placeholder="Max Attendees" required />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default AdminPanel;
