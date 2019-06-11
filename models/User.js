const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// create  schema
const UserSchema = new Schema({
    googleID: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now 
    }
});

mongoose.model('users', UserSchema);