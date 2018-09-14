
const mailvalidation = function (req, res) {
    var rightexpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validate = "Votre Identifiant est invalide"
    if (rightexpression.test(req)) {
        validate = "Votre Identifiant est valide";
    } else {
        validate = "Votre Identifiant est invalide";
    }
   return validate;
};
module.exports.mailvalidation = mailvalidation;



