const nickname =  (req, res) => {
    var validate = "Votre pseudonyme n'est pas valide";

    for (var i = 0; i < req.length; i++) {

        if (req[i] == " ") {
            validate = "Votre pseudonyme n'est pas valide";
            break;
        } else {
            validate = "Votre pseudonyme est valide";
        }

    }
    return validate;
    //res.send(validate);
};
module.exports.nickname = nickname;