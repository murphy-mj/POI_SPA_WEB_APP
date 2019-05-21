'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const pointInterestSchema = new Schema({
    name: String,
    category: String,
    description: String,
    image: String,
    location: String
});

pointInterestSchema.statics.findByName = function(name) {
    return this.findOne({ name: name});
};


module.exports = Mongoose.model('PointInterest', pointInterestSchema);