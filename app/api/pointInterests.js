'use strict';

const Boom = require('boom');
const Donation = require('../models/donation');
const Candidate = require('../models/candidate');
const User = require('../models/user');
const Pointinterest = require('../models/pointInterest');

const PointInterests = {
    findAll: {
        auth: false,
        handler: async function(request, h) {
            const pois = await PointInterest.find();
            return pois;
        }
    },
    findByCategory: {
        auth: false,
        handler: async function(request, h) {
            const pois = await Pointinterest.find({ category: request.params.id });
            return pois;
        }
    },

    makePOI: {
        auth: false,
        handler: async function(request, h) {
            let poi = new Pointinterest(request.payload);
            const user = await User.findOne({ _id: request.params.id });
            if (!user) {
                return Boom.notFound('No User with this id');
            }
            poi.user = user._id;
            poi = await poi.save();
            return poi;
        }
    },

    deleteAllPOI: {
        auth: false,
        handler: async function(request, h) {
            await Pointinterest.deleteMany({});
            return { success: true };
        }
    }
};

module.exports = PointInterests;