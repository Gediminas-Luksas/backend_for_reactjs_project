const mongoose = require('mongoose');

const rulesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    require: true,
  },
  texts: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Rules', rulesSchema);
