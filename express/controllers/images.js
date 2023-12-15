const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require('fs').promises;
const { validationResult } = require("express-validator");

async function publicIndex(req, res, next) {
    try {
        const { search } = req.query;
   

        const result = await prisma.image.findMany({
            where: {
            published: true,
            title: { contains: search },
        },
        include:{
            categories:true
        }
      });
    
      res.json({message: "immagini trovate con successo", result})
    } catch (error){
        next(error);
    }
    
};

async function publicShow(req, res, next) {

    try {
        const result = await prisma.image.findUnique({
            where: {
                id: parseInt(req.params.id),
                published: true
            },
            include:{
                categories:true
            }
       });

       if (!result){
        next(new Error("immagine non trovata"))
       }

       res.json({"message":"immagine trovata", result});
    }
   catch (error) {
       next(error);
   }
};

async function index(req, res, next) {
    try {
        const { search } = req.query;
   

        const result = await prisma.image.findMany({
            where: {
            title: { contains: search },
        },
        include:{
            categories:true
        }
      });
    
      res.json({message: "immagini trovate con successo", result})
    } catch (error){
        next(error);
    }
    
};

async function store(req, res, next) {
    let image = null;

    try{
        image = req.file;
        const validation = validationResult(req);
      

        if (!validation.isEmpty()) {
            if (image) {
                const imagePath = `public/${image.filename}`;
                await fs.unlink(imagePath);
            }
            return next(new Error(`${validation.array()[0].msg}`))
        }
        
        const request = {...req.body};

        if (request.published === "true"){
            request.published = true
        } else if (request.published === "false") {
            request.published = false
        }      

    
        const result = await prisma.image.create({
            data: {
                title: request.title,
                description: request.description,
                image: image.filename,
                published: request.published,
                userId: parseInt(request.userId),
                ...(request.categories && request.categories.length > 0
                    ? {
                        categories: {
                            connect: request.categories.map((categoryId) => ({
                                id: parseInt(categoryId),
                            })),
                        },
                    }
                : {}),
            },
            include:{
                categories:true,
            }
        });

        res.json({"message": "immagine salvata correttamente", result});

    } catch (error) {
        if (image) {
            const imagePath = `public/${image.filename}`;
            await fs.unlink(imagePath);
        }
        next(error);
    }
   
};

async function update(req, res, next) {
    let image = null;
    try {
        image = req.file;
        const validation = validationResult(req);
      

        if (!validation.isEmpty()) {
            if (image) {
                const imagePath = `public/${image.filename}`;
                await fs.unlink(imagePath);
            }
            next(new Error(`${validation.array()[0].msg}`))
        }

        if (req.body.published === "true") {
            req.body.published = true;
        } else if (req.body.published === "false") {
            req.body.published = false;
        }

        const oldImage = await prisma.image.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        const result = await prisma.image.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                title: req.body.title,
                description: req.body.description,
                ...(image && image.filename
                    ? { image: image.filename }
                    : {}),
                published: req.body.published,
                ...(req.body.categories && req.body.categories.length > 0
                    ? {
                        categories: {
                            set:[],
                            connect: req.body.categories.map((categoryId) => ({
                                id: parseInt(categoryId),
                            })),
                        },
                      }
                    : {}),
            },
            include: {
                categories: true,
            },
        });

    
        if (oldImage && oldImage.image) {
            const oldImagePath = `public/${oldImage.image}`;
            await fs.unlink(oldImagePath);
        }

        res.json({ message: "Immagine modificata", result });
    } catch (error) {
        if (image) {
            const imagePath = `public/${image.filename}`;
            await fs.unlink(imagePath);
        }
        next(error);
    }
}

async function show(req, res, next) {

    try {
        const result = await prisma.image.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include:{
                categories:true
            }
       });

       if (!result){
        next(new Error("immagine non trovata"))
       }


       res.json({"message":"immagine trovata", result});
    }
   catch (error) {
    next(error);
   }
};
   


async function destroy(req, res, next) {
    try {
        const imageId = parseInt(req.params.id);

        const imageToDelete = await prisma.image.findUnique({
            where: { id: imageId },
        });

        if (!imageToDelete) {
            return res.status(404).json({ message: 'Immagine non trovata' });
        }

        const imagePath = `public/${imageToDelete.filename}`;

        // Verifica se il file esiste prima di tentare di cancellarlo
        const fileExists = await fs.access(imagePath)
            .then(() => true)
            .catch(() => false);

        if (fileExists) {
            await fs.unlink(imagePath);
        } 
        const result = await prisma.image.delete({
            where: {
                id: imageId,
            },

        });
        res.json({ message: 'Immagine cancellata con successo' });

    } catch (error) {
        next(error);
    }
}


   

module.exports = {
    index,
    store,
    update,
    show,
    destroy,
    publicIndex,
    publicShow
}