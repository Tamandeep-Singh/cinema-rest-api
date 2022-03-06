const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    connectToDB: function(callback) {
        mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, (error) => {
           if(error) {
               callback(error);
           };
        });
    }
   
};

