'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Comments API tests', function() {
  let comments = fixtures.comments;
  let newComment = fixtures.newcomment;
  let newPoint = fixtures.newPoint;

  const donationService = new DonationService(fixtures.donationService);

  setup(async function() {
    donationService.deleteAllComments();
    donationService.deleteAllComments();
  });

  teardown(async function() {});

  test('create a comment', async function() {
    console.log(comments);
    console.log(newComment);
    // new to create point to add a comment
    const returnedPoint = await donationService.createPoint(newPoint);
    await donationService.makeComment(returnedPoint._id, comments[0].opinion);
    console.log(returnedPoint);
    const returnedComments = await donationService.getComments(returnedPoint._id);
    console.log(returnedComments);
    assert.equal(returnedComments.length, 1);
    assert(_.some([returnedComments[0]], comments[0].opinion), 'returned comment must be a superset of comment');
  });

  test('create multiple comments', async function() {
    const returnedPoint = await donationService.createPoint(newPoint);
    for (var i = 0; i < comments.length; i++) {
      await donationService.makeComment(returnedPoint._id, Comments[i]);
    }

    const returnedComments = await donationService.getComments(returnedPoint._id);
    assert.equal(returnedComments.length, comments.length);
    for (var i = 0; i < comments.length; i++) {
      assert(_.some([returnedComments[i]], comments[i]), 'returned comment must be a superset of comment');
    }
  });

  test('delete all comments', async function() {
    const returnedPoint = await donationService.createPoint(newPoint);
    for (var i = 0; i < comments.length; i++) {
      await donationService.makeComment(returnedPoint._id, comments[i]);
    }

    const d1 = await donationService.getComments(returnedPoint._id);
    assert.equal(d1.length, comments.length);
    await donationService.deleteAllComments();
    const d2 = await donationService.getComments(returnedPoint._id);
    assert.equal(d2.length, 0);
  });
});
