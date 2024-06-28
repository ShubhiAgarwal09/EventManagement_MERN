import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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
            console.log("id", id)
            console.log("user.token", user.token)
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

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h2>{event.title}</h2>
      <img src={event.banner} alt={event.title} />
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <p>Hosted by: {event.host}</p>
      <p>Attendees: {event.attendees.length} / {event.maxAttendees}</p>
      {user && (
        <div>
          {event.attendees.some(attendee => attendee._id === user.id) ? (
            <button onClick={handleCancelRSVP}>Cancel RSVP</button>
          ) : (
            <button onClick={handleRSVP}>RSVP</button>
          )}
        </div>
      )}
      <div>
        <h3>Comments</h3>
        {user && (
          <div>
            <textarea value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        )}
        <div className="comments">
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
