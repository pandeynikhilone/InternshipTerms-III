const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History');

router.get('/', async (req, res) => {
    try {
        const Users = await User.find().sort({ totalPoints: -1 });
        const ranked = Users.map((user, index) => ({
            rank: index + 1,
            _id: user._id,
            name: user.name,
            totalPoints: user.totalPoints
        }));
        res.json(ranked);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 2. Add new user
router.post("/", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newUser = new User({ name });
    await newUser
      .save()
      .then((user) => {
        console.log("✅ User created:", user);
        res.status(201).json(user);
      })
      .catch((err) => {
        console.error("❌ Error while saving user:", err);
        res.status(500).json({ error: err.message });
      });
  } catch (err) {
    console.error("❌ Error in route:", err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Claim points for a user
router.post("/claim/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const points = Math.floor(Math.random() * 10) + 1; // random 1–10

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.totalPoints += points;
    await user.save();

    const history = new History({ userId: id, points });
    await history.save();

    res.json({ message: `Awarded ${points} points to ${user.name}`, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get history for a user
router.get("/history/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const history = await History.find({ userId: id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;