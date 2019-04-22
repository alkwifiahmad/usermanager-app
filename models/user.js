const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    city:String,
    zip: Number,
    street: String,
    country: String
})

const userScehma = new Schema({
    name: String,
    role: String,
    email: String,
    password: String,
    address: addressSchema
})

const User = mongoose.model('User', userScehma);
module.exports = User;