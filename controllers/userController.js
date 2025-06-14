const { User } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const { email, clerkUserId } = req.body;

    if (!email || !clerkUserId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, and clerkUserId.',
      });
    }
    
    const findUser = await User.findOne({where: {
      email: email,
      clerkUserId: clerkUserId
    }});

    if (findUser) {
      res.status(201).json({ success: true, data: findUser });
    } else {
      const user = await User.create({
        email,
        clerkUserId
      });
      res.status(201).json({ success: true, data: user });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};