'use strict';

const Accounts = require('../controllers/accounts');
const Donations = require('../controllers/donations');
const Points = require('../controllers/points');
const Comments = require('../controllers/comments');


module.exports = [
  { method: 'GET', path: '/', config: Accounts.index },
  { method: 'GET', path: '/signup', config: Accounts.showSignup },
  { method: 'GET', path: '/login', config: Accounts.showLogin },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/signup', config: Accounts.signup },
  { method: 'POST', path: '/login', config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  { method: 'GET', path: '/home', config: Donations.home },
  { method: 'GET', path: '/report', config: Donations.report },
  { method: 'POST', path: '/donate', config: Donations.donate },

//  { method: 'GET', path: '/poihome', config: Donations.home },
  { method: 'GET', path: '/pointreport', config: Points.pointReport },
//  { method: 'POST', path: '/pointadd', config: Donations.donate },

 // { method: 'GET', path: '/pointHome', config: Points.pointHome },
//  { method: 'GET', path: '/pointReport', config: Points.pointReport },
  { method: 'GET', path: '/pointHome', config: Points.pointHome },
  { method: 'POST', path: '/pointadd', config: Points.pointAdd },
  { method: 'GET', path: '/pointView/{_id}', config: Points.pointView },
  { method: 'POST', path: '/pointaddcomment', config: Comments.postComment },
  { method: 'GET', path: '/addcomment/{_id}', config: Points.addComment },
  { method: 'GET', path: '/viewcomment/{_id}', config: Comments.viewComments },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    },
    options: { auth: false }
  }
];
