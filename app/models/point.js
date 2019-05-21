'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const pointSchema = new Schema({
    name: String,
    category: String,
    description: String,
    image: String,
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }
});

pointSchema.statics.findByName = function(name) {
    return this.findOne({ name: name});
};


module.exports = Mongoose.model('Point', pointSchema);