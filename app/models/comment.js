'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const commentSchema = new Schema({
  opinion: String,
  //date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  point:  {
    type: Schema.Types.ObjectId,
    ref: 'Point',
  },
});

module.exports = Mongoose.model('Comment', commentSchema);
