const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { eventId, comment, parentCommentId } = req.body;
  try {
    const commentData = { user: req.user.id, event: eventId, comment};

    if (parentCommentId) {
      commentData.parent_comment = parentCommentId;
    }

    const newComment = new Comment(commentData);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: 'Error adding comment' });
  }
};
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ event: req.params.eventId,parent_comment: null }).populate('user', 'username')
    for (let comment of comments) {
      comment.replies = await getNestedComments(comment._id);
    }

    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching comments' });
  }
};
async function getNestedComments(parentId) {
  const replies = await Comment.find({ parent_comment: parentId })
    .populate('user', 'username')
    .lean();

  for (let reply of replies) {
    reply.replies = await getNestedComments(reply._id);
  }

  return replies;
}
