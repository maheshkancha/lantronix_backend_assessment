const mongoose = require('mongoose');

const dburl = "mongodb://127.0.0.1:27017/userprofiledb";

const connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((res, err) => {
                if (err) return reject(err);
                console.log('Connected to MongoDB...');
                resolve();
            })
    });
}

const disconnect = () => {
    return mongoose.disconnect();
}

module.exports = { connect, disconnect };
