const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  lastDaily: {
    type: Date,
    require: true,
  },
  streak: {
    type: Number,
    default: 1,
  },
});

module.exports = model("User", userSchema);
