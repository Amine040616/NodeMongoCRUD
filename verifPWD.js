const mdpvalidation = function (req, res) {

    var nimrou = ["@", "_", "-", ".", ",", ";", ":"];
    var power = 0;
    var powerMessages = ['Faible', 'Normale', 'Fort', 'Super', 'Mot de passe invalide'];

    if (req.length < 8) {
        power = "4";
    } else {

        for (var i = 0; i < req.length; i++) {
            if (isNaN(req[i]) == false) {
                power++;
                console.log('Number');
                break;
            }
        }

        for (var i = 0; i < req.length; i++) {
            if (nimrou.indexOf(req[i]) == -1 && isNaN(req[i]) && req[i] == req[i].toUpperCase()) {
                power++;
                console.log('Uppercase');
                break;
            }
        }

        for (var i = 0; i < req.length; i++) {
            if (nimrou.indexOf(req[i]) > -1) {
                power++;
                console.log('Special');
                break;
            }
        }
    }
    return powerMessages[power];
    //res.send(powerMessages[power]);
};

module.exports.mdpvalidation = mdpvalidation;