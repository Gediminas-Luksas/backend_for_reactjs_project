const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  team: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Team', teamSchema);
