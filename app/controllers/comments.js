'use strict';

const User = require('../models/user');
const Donation = require('../models/donation');
const Candidate = require('../models/candidate');
const Point = require('../models/point');
const Comment = require('../models/comment');

const Comments = {
  home: {
    handler: async function(request, h) {

      const points = await Point.find();
      return h.view('home', {title: 'Make a Comment', points: points });
      }
  },

  viewComments: {
    handler: async function(request, h) {
      try {
          console.log("in view comments  Comments3");
          const idu = request.auth.credentials.id;
          //const data = request.payload;
          const id =  request.params._id;
          //const id = data.poiId;
          const poi = await Point.findById(id);
          const user = await User.findById(idu);
          console.log("view comments user ID "+ idu);
          console.log("view comments point ID "+ id);
        //  const comments = await Comment.find({ point: request.params.id }).populate('user').populate('point');
          const comments = await Comment.find({ point: request.params._id });
       // const comments = await Comment.find().populate('user').populate('point');
          console.log("view comments on point "+ comments);

        return h.view('commentreport', {
          title: 'Comments to Date',
          comments: comments,
            user: user,
            point: poi
        });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  postComment: {
    handler: async function(request, h) {
      try {
        const idu = request.auth.credentials.id;
       // const id = request.params._id;
        const data = request.payload;
        const id = data.poiId;
        //const id = request.query.id;
          console.log(id +" is the id from Post comment");
       //const poi = await Point.findOne({ _id: request.params.id });
        const poi = await Point.findById(id);
        const user = await User.findById(idu);
        console.log("post comment poi ID "+ id);
        console.log("post comment user ID "+ idu);

          console.log("post comment poi _ID "+ poi._id);
         console.log("post comment user _ID "+ user);


        //const rawPoint = request.payload.point;

        const newComment = new Comment({
          opinion: data.commentE,
          user: user._id,
          point: poi._id
        });

        await newComment.save();

        console.log("coment - " + newComment)

          // const comments = await Comment.find();
         //const point = await Point.findById(rawPoint._id);
          //const point = await Point.findById(id).populate('location');
          //const user2 = await User.findById(idu)


          return h.view('home', {
              title: 'comment added',
           //   point: poi,
           //   comment: newComment,
           //   user: user
          });

      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  }

};

module.exports = Comments;
