import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './EventPage.css'

const EventPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    };

    const fetchComments = async () => {
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(res.data);
    };

    fetchEvent();
    fetchComments();
  }, [id]);
    const handleRSVP = async () => {
        try {
        await axios.post('http://localhost:5000/api/rsvp', { eventId: id }, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        const updatedEvent = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(updatedEvent.data);
        } catch (error) {
        console.error('RSVP error:', error);
        }
    };

  const handleCancelRSVP = async () => {
    await axios.delete('http://localhost:5000/api/rsvp', {
      headers: { Authorization: `Bearer ${user.token}` },
      data: { eventId: id }
    });
    const updatedEvent = await axios.get(`http://localhost:5000/api/events/${id}`);
    setEvent(updatedEvent.data);
  };

  const handleAddComment = async () => {
    await axios.post('http://localhost:5000/api/comments', { eventId: id, comment: newComment }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
    setComments(res.data);
    setNewComment('');
  };

  if (!event) return <div className="loading">Loading...</div>;

  return (
    <div className="event-page">
      <div className="event-details">
        <h2>{event.title}</h2>
        <img src={event.banner} alt={event.title} className="event-banner" />
        <p>{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Hosted by:</strong> {event.host}</p>
        <p><strong>Attendees:</strong> {event.attendees.length} / {event.maxAttendees}</p>
        {user && (
          <>
          <div className="attendee-list">
            <h3>Attendees:</h3>
            {event.attendees && event.attendees.length > 0 ? (
              <p>{event.attendees.map(attendee => attendee.username).join(', ')}</p>
            ) : (
              <p>No attendees yet.</p>
            )}
          </div>
          <div className="rsvp-buttons">
            {event.attendees.some(attendee => attendee._id === user.id) ? (
              <button className="btn cancel-rsvp" onClick={handleCancelRSVP}>Cancel RSVP</button>
            ) : (
              <button className="btn rsvp" onClick={handleRSVP}>RSVP</button>
            )}
          </div>
          </>
        )}
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        {user && (
          <div className="comment-form">
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Add your comment..."
            ></textarea>
            <button className="btn add-comment" onClick={handleAddComment}>Add Comment</button>
          </div>
        )}
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment._id} className="comment">
              <p><strong>{comment.user.username}</strong> {new Date(comment.timestamp).toLocaleString()}</p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
