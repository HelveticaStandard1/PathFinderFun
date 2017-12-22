module.exports = function (Gameboard) {

    Gameboard.find({primaryBoard: true}, function (error, gameboard) {
        if (error) {
            throw error;
        }
        if (gameboard.length === 0) {
            Gameboard({
                canvasUrl: '',
                primaryBoard: true
            }).save(function (err) {
                if (err) throw err;
                console.log('New board saved successfully');
            });
        } else {
            gameboard[0].update({canvasUrl: ''}, function (err, raw) {
                if (err) throw err;
                console.log('Updated board to new canvas.  Raw Response: ' + raw);
            });
        }
    });
};