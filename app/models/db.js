'use strict';

require('dotenv').config();
const fs = require('fs');
const Mongoose = require('mongoose');
const axios = require('axios');
const Point = require('../models/point');

Mongoose.connect(process.env.db);
const db = Mongoose.connection;
var obj =[];
var alljson = [];

fs.readFile('initdata.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
        obj = JSON.parse(data); //now it an objec
          }});

var url = "https://raw.githubusercontent.com/edeleastar/oileain-api/master/all.json"

axios.get(url).then(function(response){
 // var alljson = response.data.response.group[0].items;
  alljson = response.data;
  for (let i = 0; i < alljson.length; i++){
    const poi1 = alljson[1].pois[i];
    const newPoint = new Point({
            name: poi1.name,
            category: "Islands",
            description: poi1.description,
            image: "na"
    });
    console.log(newPoint);
    //let newP = await newPoint.save();
    obj.push({points:newPoint}); //add some data
  }
}).then(function(response){
    const objJ = JSON.stringify(obj); //convert it back to json
    fs.writeFile('initdata.json', objJ, 'utf8', (err) => {
        if(err) throw err;
    console.log('The file has been saved!');
    })
});


//.then(function(response) {
//if (alljson.length > 0) {
 //   const objJ = JSON.stringify(obj); //convert it back to json
 //   fs.writeFile('initdata.json', objJ, 'utf8', (err) => {
  //      if(err) throw err;
//    console.log('The file has been saved!');
//    }); // write it back
//} else {
// console.log('no new data saved');
//}




async function seed() {
  var seeder = require('mais-mongoose-seeder')(Mongoose);
  const data = require('./initdata.json');
  const Donation = require('./donation');
  const Candidate = require('./candidate.js');
  const PointInterest = require('./pointInterest.js');
  const Point = require('./point.js');
  const User = require('./user');
  const dbData = await seeder.seed(data, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

db.on('error', function(err) {
  console.log(`database connection error: ${err}`);
});

db.on('disconnected', function() {
  console.log('database disconnected');
});

db.once('open', function() {
  console.log(`'database connected to ${this.name} on ${this.host}`);
  seed();
})