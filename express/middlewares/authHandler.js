const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
        throw new Error("Errore nella creazione del token");
    }

    const token = bearer.split(" ")[1];

    const user = jsonwebtoken.verify(token,process.env.JWT_SECRET);

    req["user"] = user;

    next();
}