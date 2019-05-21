'use strict';

const User = require('../models/user');
const Donation = require('../models/donation');
const Candidate = require('../models/candidate');
const Point = require('../models/point');
const Location = require('../models/location');
const Comment = require('../models/comment');


const Points = {
    pointHome: {
        handler: async function(request, h) {
            const points = await Point.find();
            return h.view('addpoint', { title: 'Add a Point', points: points });
        }
    },

    pointView: {
        handler: async function(request, h) {
            try {
                console.log("in pointView");
                const id = request.params._id;
                console.log("id "+ id);

                // const points = await Point.find();
                //await Donation.find().populate('donor').populate('candidate')
                const points = await Point.findById(id).populate('location');
                return h.view('viewPoint3', {
                    title: 'Points added to Date',
                    points: points
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    addComment: {
        handler: async function(request, h) {
            try {
                console.log("in add Comment in Points");
                const id = request.params._id;
                const idu = request.auth.credentials.id;
                const poi = await Point.findById(id);
                const user = await User.findById(idu);
                console.log("add comment poi ID "+ id);
                console.log("add comment user ID "+ idu);


                // const points = await Point.find();
                //await Donation.find().populate('donor').populate('candidate')
               // const point = await Point.findById(id).populate('location');
                //const user1 = await User.findById(id);

                return h.view('addComment2', {
                    title: 'Please comment',
                    point: poi,
                    user:user
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },



    pointReport: {
        handler: async function(request, h) {
            try {
                //const pointInterests = await PointInterest.find().populate('donor').populate('candidate');
               // const points = await Point.find();
                //await Donation.find().populate('donor').populate('candidate')
                const points = await Point.find().populate('location');


                return h.view('poireport', {
                    title: 'Points added to Date',
                    points: points
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    pointAdd: {
        auth: false,
        handler: async function(request, h) {
            try {
                //const id = request.auth.credentials.id;
                //const user = await User.findById(id);
                const data = request.payload;

                // const rawCandidate = request.payload.candidate.split(',');
                //  const candidate = await Candidate.findOne({
                //     lastName: rawCandidate[0],
                //      firstName: rawCandidate[1]
                //  });
                console.log("text  "+ data.name);
                console.log(data.category);
                console.log(data.lat);

                const newLocation = new Location({lat:data.lat,lng:data.lng});
                console.log(data.lat);
                const newLocation2 = await newLocation.save();

                console.log("point add here"+ data.name);

                const newPoint = new Point({
                    name: data.name,
                    category: data.category,
                    description: data.description,
                    image: data.image,
                    location: newLocation._id
                });
                await newPoint.save();
                return h.redirect('/pointreport');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    find: {
        auth: false,
        handler: async function(request, h) {
            const points = await Point.find();
            return points;
        }
    }




};

module.exports = Points;
