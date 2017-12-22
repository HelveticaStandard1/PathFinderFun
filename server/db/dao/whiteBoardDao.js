getPrimaryBoard = function () {
    return new Promise(function (resolve, error) {
        var gameBoard = require('../models/gameboard');
        gameBoard.find({primaryBoard: true}, function (err, gameboard) {
            if (err) {
                error(err);
            }
            resolve(gameboard);
        });
    });
};

updatePrimaryBoard = function (data) {
    var gameBoard = require('../models/gameboard');
    gameBoard.findOneAndUpdate({ primaryBoard: true },{ canvasUrl: data.canvas }, { new: true }, function (err, gameBoard) {
        if (err) {
            throw err;
        }
        console.log('gameBoard updated');
    });
};

module.exports = {

    getPrimaryBoard: getPrimaryBoard,
    updatePrimaryBoard: updatePrimaryBoard

};