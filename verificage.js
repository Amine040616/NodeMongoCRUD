const birthdatevalidation =  (req, res) => {

    function age(a, b) {
        var oneyear = 60 * 60 * 24 * 365 * 1000;
        return Math.floor(Math.abs(a - b) / oneyear);
    };

    var validate = "Vous n'avez pas l'age pour accéder au site";
    var birthdate = req;
    var ancien = Date.parse(birthdate);
    var present = Date.now();

    console.log(age(present, ancien));

    if (age(present, ancien) < 18) {
        validate = "Vous n'avez pas l'age pour accéder au site";
    } else {
        validate = "Bienvenue dans notre site web";
    }

    return validate;
};

module.exports.birthdatevalidation = birthdatevalidation;




