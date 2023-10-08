const mongoose = require("mongoose");

const tenderSchema = new mongoose.Schema({
  tID: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  document: {
    type: String,
    required: false,
  },
  closeDate: {
    type: String,
    required: true,
  },
});

const Tender = mongoose.model('Tender', tenderSchema);
module.exports = Tender;