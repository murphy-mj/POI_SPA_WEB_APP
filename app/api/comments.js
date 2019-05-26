'use strict';

const Boom = require('boom');
const Donation = require('../models/donation');
const Candidate = require('../models/candidate');
const Point = require('../models/point');
const Comment = require('../models/comment');
//const utils = require('./utils.js');

const Comments = {
  findAll: {
    auth: {
      strategy: 'jwt',
    },
    //auth: false,
    handler: async function(request, h) {
      const comments = await Comment.find();
      return comments;
    }
  },
  findByPoint: {
    auth: {
      strategy: 'jwt',
    },
    //auth: false,
    handler: async function(request, h) {
      const comments = await Comment.find({ point: request.params.id });
      return comments;
    }
  },

  makeComment: {
    auth: {
      strategy: 'jwt',
    },
    //auth: false,
    handler: async function(request, h) {
      let comment = new Comment(request.payload);
      const point = await Point.findOne({ _id: request.params.id });
      if (!point) {
        return Boom.notFound('No Point of Interest with this id');
      }
      const userId = utils.getUserIdFromRequest(request);
      comment.user=userId;
      comment.point = point._id;
      comment = await comment.save();
      return comment;
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    //auth: false,
    handler: async function(request, h) {
      await Comment.deleteMany({});
      return { success: true };
    }
  }
};

module.exports = Comments;
