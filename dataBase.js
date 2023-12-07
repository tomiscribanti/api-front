const mongoose = require('mongoose');

mongoose.connect( 'mongodb://localhost:27017/biblioteca' , {

})

module.exports = mongoose.connection;