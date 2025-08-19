// backend/models/History.js
const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: { type: Number, required: true },
  },
  { timestamps: true } // ✅ adds createdAt/updatedAt
);

module.exports = mongoose.model("History", historySchema);
