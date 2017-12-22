var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameBoardSchema = new Schema( {
    canvasUrl: String,
    primaryBoard: Boolean
});

var gameBoard = mongoose.model('GameBoard', gameBoardSchema);

module.exports = gameBoard;