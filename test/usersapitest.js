'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const donationService = new DonationService(fixtures.donationService);


  suiteSetup(async function() {
    await donationService.deleteAllUsers();
    const returnedUser = await donationService.createUser(newUser);
    const response = await donationService.authenticate(newUser);
  });

  suiteTeardown(async function() {
    await donationService.deleteAllUsers();
    donationService.clearAuth();
  });



  setup(async function () {
   await donationService.deleteAllUsers();
  });

  teardown(async function () {
    await donationService.deleteAllUsers();
  });

  test('create a user', async function () {
    const returnedUser = await donationService.createUser(newUser);
    console.log(" returned user in create user = ");
    console.log(returnedUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });

  test('get user', async function () {
    console.log("get user, create first");
    console.log(newUser);
    const u1 = await donationService.createUser(newUser);
    console.log("this is U1, get user ");
    console.log(u1);
    const u2 = await donationService.getUser(u1._id);
    console.log("this is U2, get user ");
    console.log(u2);
    assert.deepEqual(u1, u2);
  });

  test('get invalid user', async function () {
    const u1 = await donationService.getUser('1234');
    assert.isNull(u1);
    const u2 = await donationService.getUser('012345678901234567890123');
    assert.isNull(u2);
  });


  test('delete a user', async function () {

    let u = await donationService.createUser(newUser);
    assert(u._id != null);
    await donationService.deleteOneUser(u._id);
    u = await donationService.getUser(u._id);
    assert(u == null);
  });



  test('get all users', async function () {
    await donationService.deleteAllUsers();

    await donationService.createUser(newUser);
    await donationService.authenticate(newUser);
    console.log(users);
    for (let u of users) {
      await donationService.createUser(u);
    }

    const allUsers = await donationService.getUsers();
    assert.equal(allUsers.length, users.length);
  });



  test('get users detail', async function () {
    await donationService.deleteAllUsers();
    await donationService.createUser(newUser);
    await donationService.authenticate(newUser);

    for (let u of users) {
      await donationService.createUser(u);
    }
    const testUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };
    // unshift add to start of array, so users not comparable
    //users.unshift(testUser);
    users.add(testUser);


    const allUsers = await donationService.getUsers();
    //for (var i = 0; i < users.length; i++) {
     for (var i = 0; i < allUsers.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  });

  test('get all users empty', async function () {
    await donationService.deleteAllUsers();
    await donationService.createUser(newUser);
    await donationService.authenticate(newUser);
    const allUsers = await donationService.getUsers();
    assert.equal(allUsers.length, 1);
  });

});
