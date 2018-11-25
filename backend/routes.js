const AuthController = require("./controllers/AuthController");
require("./services/passport");
const passport = require("passport");

const requireToken = passport.authenticate("jwt", {
    session: false
});

const requireValidateCredentials = passport.authenticate("local", {
    session: false
});

module.exports = function (expressServer){
    expressServer.post("/signup", AuthController.signup);

    expressServer.get("/secretRessource", requireToken, function(req, res) {
        res.send({
            result: 'ressource sécurisée'
        });
    });

    expressServer.post("/signin", requireValidateCredentials, AuthController.signin);

}