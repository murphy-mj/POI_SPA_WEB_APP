'use strict';

const Boom = require('boom');
const Location = require('../models/location');

const Locations = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const locations = await Location.find();
      return locations;
    }
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const location = await Location.findOne({ _id: request.params.id });
        if (!location) {
          return Boom.notFound('No Location with this id');
        }
        return location;
      } catch (err) {
        return Boom.notFound('No Location with this id');
      }
    }
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      const newLocation = new Location(request.payload);
      const location = await newLocation.save();
      if (location) {
        return h.response(location).code(201);
      }
      return Boom.badImplementation('error creating location');
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Location.deleteMany({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const response = await Location.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};

module.exports = Locations;
