'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
//const initialdata = require('./initialdata.json');

const _ = require('lodash');


suite('Points of Interests API tests', function () {

  let points = fixtures.points;
  let newPoint = fixtures.newPoint;

  const donationService = new DonationService(fixtures.donationService);


  setup(async function () {
    await donationService.deleteAllPoints();
  });

  teardown(async function () {
    await donationService.deleteAllPoints();
  });

  test('create a point', async function () {
    const returnedCandidate = await donationService.createPoint(newPoint);
    assert(_.some([returnedPoint], newPoint), 'returnedCandidate must be a superset of newCandidate');
    assert.isDefined(returnedPoint._id);
  });

  test('get point', async function () {
    const c1 = await donationService.createPoint(newPoint);
    const c2 = await donationService.getPoint(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid point', async function () {
    const c1 = await donationService.getPoint('1234');
    assert.isNull(c1);
    const c2 = await donationService.getPoint('012345678901234567890123');
    assert.isNull(c2);
  });


  test('delete a point', async function () {
    let c = await donationService.createPoint(newPoint);
    assert(c._id != null);
    await donationService.deleteOnePoint(c._id);
    c = await donationService.getPoint(c._id);
    assert(c == null);
  });

  test('get all points', async function () {
    for (let c of points) {
      await donationService.createPoint(c);
    }

    const allPoints = await donationService.getPoints();
    assert.equal(allPoints.length, points.length);
  });

  test('get point detail', async function () {
    for (let c of points) {
      await donationService.createPoint(c);
    }

    const allPoints = await donationService.getPoints();
    for (var i = 0; i < points.length; i++) {
      assert(_.some([allPoints[i]], points[i]), 'returnedPoint must be a superset of newPoint');
    }
  });

  test('get all points empty', async function () {
    const allPoints = await donationService.getPoints();
    assert.equal(allPoints.length, 0);
  });

});
