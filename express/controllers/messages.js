const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function store(req, res, next) {
    try {
        const { email, text } = req.body;

        const newMessage = await prisma.message.create({
            data: {
                email,
                text,
            },
        });

        res.json({ message: "Messaggio inviato con successo", data: newMessage });
    } catch (error) {
        next(error);
    }
}

async function index(req, res, next) {
    try {
        const messages = await prisma.message.findMany();

        res.json({ message: "Elenco dei messaggi recuperato con successo", data: messages });
    } catch (error) {
       next(error);
    }
}

module.exports = {
    store,
    index,
};