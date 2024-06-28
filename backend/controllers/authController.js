const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password: bcrypt.hashSync(password, 8) });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Username already exists' });
  }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
      const user = await User.findOne({ username });
  
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
      const token = jwt.sign(
        { id: user._id, username: user.username },
        "ad9cad68bc5f7de0a78698bc0602a36dc205bfc14b4724656521b19bb829c5d2",
        { expiresIn: '1h' }
      );

      res.json({ token, username: user.username });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
