const Candidates = require('./app/api/candidates');
const Users= require('./app/api/users');
const Donations = require('./app/api/donations');
//const PointInterest = require('./app/api/pointInterests');
const Points = require('./app/api/points');
const Locations = require('./app/api/locations');
const Comments = require('./app/api/comments');

module.exports = [
  { method: 'GET', path: '/api/candidates', config: Candidates.find },
  { method: 'GET', path: '/api/candidates/{id}', config: Candidates.findOne },
  { method: 'POST', path: '/api/candidates', config: Candidates.create },
  { method: 'DELETE', path: '/api/candidates/{id}', config: Candidates.deleteOne },
  { method: 'DELETE', path: '/api/candidates', config: Candidates.deleteAll },

  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: 'POST', path: '/api/users', config: Users.create },
  { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

  { method: 'GET', path: '/api/donations', config: Donations.findAll },
  { method: 'GET', path: '/api/candidates/{id}/donations', config: Donations.findByCandidate },
  { method: 'POST', path: '/api/candidates/{id}/donations', config: Donations.makeDonation },
  { method: 'DELETE', path: '/api/donations', config: Donations.deleteAll },

  { method: 'GET', path: '/api/comments', config: Comments.findAll },
  { method: 'GET', path: '/api/points/{id}/comments', config: Comments.findByPoint },
  { method: 'POST', path: '/api/points/{id}/comments', config: Comments.makeComment },
  { method: 'DELETE', path: '/api/comments', config: Comments.deleteAll },

  { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate },
//    { method: 'GET', path: '/api/pointInterests', config: PointInterest.findAll },
//    { method: 'GET', path: '/api/pointInterests/{id}/poi', config: PointInterest.findByCategory },
    // { method: 'POST', path: '/api/pointInterests/{id}/poi', config: PointInterest.AddPOI },
//    { method: 'DELETE', path: '/api/pointInterests', config: PointInterest.deleteAllPOI },

    { method: 'GET', path: '/api/points', config: Points.findAll },
    { method: 'GET', path: '/api/points/{id}', config: Points.findOne },
   // { method: 'GET', path: '/api/points/{category}', config: Points.findByCategory },
    { method: 'POST', path: '/api/points', config: Points.pointAdd },
    { method: 'DELETE', path: '/api/points/{id}', config: Points.deleteOne },
    { method: 'DELETE', path: '/api/points', config: Points.deleteAll },

    { method: 'GET', path: '/api/locations', config: Locations.find },
    { method: 'GET', path: '/api/locations/{id}', config: Locations.findOne },
    { method: 'POST', path: '/api/locations', config: Locations.create },
    { method: 'DELETE', path: '/api/locations/{id}', config: Locations.deleteOne },
    { method: 'DELETE', path: '/api/locations', config: Locations.deleteAll }


];
