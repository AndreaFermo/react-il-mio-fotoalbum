const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { matchedData } = require("express-validator");

async function register(req, res) {
   try {
    const sanitizedData = matchedData(req);
    console.log(sanitizedData)
    sanitizedData.password = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.user.create({
        data: {
            ...sanitizedData
        },
        select: {
            id: true,
            name: true,
            lastname: true,
            email: true
        }
    });

    const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.json({user, token})
   } catch (error) {
    next(error);
   }
   
}

async function login (req, res, next) {
    try {
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if (!user) {
            next(new Error("Utente inesistente"));
        }
    
        
        const matchPassword = await bcrypt.compare(password, user.password);
    
        if (!matchPassword) {
            next(new Error("La password non corrisponde"))
        }
    
        const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, { expiresIn: "1h"});
    
        delete user.password;
    
        res.json({"status": "Login effettuato con successo", user, token});
    
    } catch (error) {
        next(error);
    }

   
}

module.exports = {
    register,
    login,
  };