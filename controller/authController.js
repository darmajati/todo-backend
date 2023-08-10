const { User } = require("../models");

module.exports = {
  login: async (req, res) => {
    try {
      const { pin } = req.body;

      const user = await User.authenticate({ pin });

      const token = user.generateToken();
      const id = user.id

      return res.status(200).json({ message: "Login success", token, id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  },

register: async (req, res) => {
    try {
      const { pin } = req.body;

      if (pin.length !== 4) {
        return res.status(400).json({ message: 'PIN must be exactly 4 characters long' });
      }

      const existingUser = await User.findOne({
        where: {
          pin: pin,
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = await User.create({
        pin: pin,
      });

      return res.status(201).json({ message: 'Registration success' });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};