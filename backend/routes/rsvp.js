const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, rsvpController.rsvpEvent);
router.delete('/', authMiddleware, rsvpController.cancelRsvp);

module.exports = router;
