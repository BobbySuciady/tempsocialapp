const {verify} = require('jsonwebtoken');

// Middleware makes bunch of checks before allowing the request to go through
//For exampl, when posting comment, it goes through middleware first, and then goes through the router.post function code
const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")

    if (!accessToken)  { // checks if there is token or not
        return res.json({error: "User not logged in"});
    } else { // if there is..
        try {
            const validToken = verify(accessToken, "importantsecret") // verify if its valid
            req.user = validToken; //validToken is the data (username, password, id, etc)
            if (validToken) {
                return next();
            }
        } catch (err) {
            return res.json({error: err});
        }
    }
}

module.exports = {validateToken};