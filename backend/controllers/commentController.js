const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { eventId, comment } = req.body;
  try {
    const newComment = new Comment({ user: req.user.id, event: eventId, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: 'Error adding comment' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ event: req.params.eventId }).populate('user', 'username');
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching comments' });
  }
};
