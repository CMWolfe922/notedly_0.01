// Require the monggose library
const mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {
        // Using the Mondo Driver's Updated URL string parser
        mongoose.set('useNewUrlParser', true);
        // Use the findOneAndUpdate in place of findAndModify()
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(DB_HOST);

        mongoose.connection.on('error', err => {
            console.log(err);
            console.log(
                "MongoDB Connection Error. Make Sure MongoDB is Running!"
            );
            process.exit();
        });
    },
    close: () => {
        mongoose.connection.close();
    }
};
