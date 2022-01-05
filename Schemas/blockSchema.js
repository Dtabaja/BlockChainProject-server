const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
    unique: true,
  },
  index: {
    type: String,
    required: false,
  },
  data: {
    type: String,
    require: false,
  },
  nonce: {
    type: String,
    require: false,
  },
  hash: {
    type: String,
    require: false,
  },
  precedingHash: {
    type: String,
    require: false,
  },
  isMine: {
    type: Boolean,
    require: false,
  },
});

module.exports = mongoose.model("blockContent", blockSchema);
