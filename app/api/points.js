'use strict';

const Boom = require('boom');
const Donation = require('../models/donation');
const Candidate = require('../models/candidate');
const User = require('../models/user');
const Point = require('../models/point');
//const utils = require('./utils.js');

const Points = {
    findAll: {
        auth: {
            strategy: 'jwt',
        },
        //auth: false,
        handler: async function(request, h) {
            const points = await Point.find();
            return points;
        }
    },


    findByCategory: {
        auth: {
            strategy: 'jwt',
        },
        //auth: false,
        handler: async function(request, h) {
            const points = await Point.find({ category: request.params.category });
            return points;
        }
   },

    findOne: {
        auth: {
            strategy: 'jwt',
        },
        //auth: false,
        handler: async function(request, h) {
            try {
                const point = await Point.findOne({ _id: request.params.id });
                if (!point) {
                    return Boom.notFound('No Point with this id');
                }
                return point;
            } catch (err) {
                return Boom.notFound('No Point with this id');
            }
        }
    },


    pointAdd: {
        auth: {
            strategy: 'jwt',
        },
        //auth: false,
        handler: async function(request, h) {
            const newPoint = new Point(request.payload);
            //const point = await Point.find({newpoint.name });
            const point = await newPoint.save();
            if (!point) {
                return Boom.notFound('No Point with this id');
            }
            return point;
        }
    },

    create: {
        auth: {
            strategy: 'jwt',
        },
        //auth: false,
        handler: async function(request, h) {
            const newPoint = new Point(request.payload);
            const point = await newPoint.save();
            if (point) {
                return h.response(point).code(201);
            }
            return Boom.badImplementation('error creating point');
        }
    },


    deleteAll: {
        auth: {
            strategy: 'jwt',
        },
        // auth: false,
        handler: async function(request, h) {
            await Point.deleteMany({});
            return { success: true };
        }
    },
    deleteOne: {
        auth: {
            strategy: 'jwt',
        },
        // auth: false,
        handler: async function(request, h) {
            const response = await Point.deleteOne({ _id: request.params.id });
            if (response.deletedCount == 1) {
                return { success: true };
            }
            return Boom.notFound('id not found');
        }
    }


};

module.exports = Points;