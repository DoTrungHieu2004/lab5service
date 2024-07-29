const mongoose = require('mongoose');

const local = 'mongodb+srv://hieu10data:4u2s3xD71hCHxSK1@cluster0.knaphru.mongodb.net/Lab5_hieu10';

const connect = async () => {
    try {
        await mongoose.connect(local);
        console.log('Connect success');
    } catch (error) {
        console.error('Connection to MongoDB failed: ', error);
    }
}

module.exports = { connect };