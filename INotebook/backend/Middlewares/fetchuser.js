const jwt = require('jsonwebtoken');
const JWT_SECRET = "vikasAbC";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    console.log(req.header)
    if (!token) {
        res.status(401).send({ error: "Please authenticate/enter using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error })
    }
}

module.exports = fetchuser;