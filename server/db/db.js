module.exports= function(mongoose){
    mongoose.connect('mongodb://PFUSER:PFUSER@ds161446.mlab.com:61446/pathfinder_db');

    var gameBoard = require('./models/gameboard');

    // Clear whiteboard at startup
    require('../startup/clearwhiteboard')(gameBoard);
};
