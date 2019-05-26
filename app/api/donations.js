'use strict';

const Boom = require('boom');
const Donation = require('../models/donation');
const Candidate = require('../models/candidate');
//const utils = require('./utils.js');

const Donations = {
  findAll: {
    auth: {
      strategy: 'jwt',
    },
    //auth: false,
    handler: async function(request, h) {
      const donations = await Donation.find();
      return donations;
    }
  },
  findByCandidate: {
    auth: {
      strategy: 'jwt',
    },
    //auth: false,
    handler: async function(request, h) {
      const donations = await Donation.find({ candidate: request.params.id });
      return donations;
    }
  },

  makeDonation: {
    auth: {
      strategy: 'jwt',
    },
    //auth: false,
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      console.log(" within makeDonation, payload");
      console.log(payload);
      let donation = new Donation(request.payload);
      const candidate = await Candidate.findOne({ _id: request.params.id });
      if (!candidate) {
        return Boom.notFound('No Candidate with this id');
      }
      donation.candidate = candidate._id;
      donation.donor=userId;
      donation = await donation.save();
      return donation;
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    //auth: false,
    handler: async function(request, h) {
      await Donation.deleteMany({});
      return { success: true };
    }
  }
};

module.exports = Donations;
