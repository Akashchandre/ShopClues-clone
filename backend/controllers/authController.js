const User = require('../models/User');
const jwt = require('jsonwebtoken');


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = signToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });

    res.status(201).json({ status: 'success', token, user });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    const token = signToken(user._id);
    console.log("Generated Token:", token); 

    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });

    res.status(200).json({ status: 'success', token, user });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000), // Expire immediately
  });
  res.status(200).json({ status: 'success' });
};