'use strict';

const User = require('../models/user');
const Donation = require('../models/donation');
const Candidate = require('../models/candidate');
const PointInterest = require('../models/pointInterest');

const PointInterests = {
    home: {
        handler: async function(request, h) {
            const points = await PointInterests.find();
            return h.view('home', { title: 'Add a POI', pointInterests: points });
        }
    },

    report: {
        handler: async function(request, h) {
            try {
                //const pointInterests = await PointInterest.find().populate('donor').populate('candidate');
                const pointInterests = await PointInterest.find().populate('user').populate('category');
                return h.view('poireport', {
                    title: 'Points added to Date  78',
                    pointsInterest: pointInterests
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    addPOI: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;

               // const rawCandidate = request.payload.candidate.split(',');
              //  const candidate = await Candidate.findOne({
               //     lastName: rawCandidate[0],
              //      firstName: rawCandidate[1]
              //  });

                const newPoi = new PointInterest({
                    name: data.name,
                    category: data.category,
                    description: data.description,
                    image: data.image,
                    location: data.location
                    //candidate: candidate._id
                });
                await newPoi.save();
                return h.redirect('/report');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    }
};

module.exports = PointInterests;
