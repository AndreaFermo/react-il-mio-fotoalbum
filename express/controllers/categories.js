const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function index(req, res, next) {
  try {
    const categories = await prisma.category.findMany();
    res.json({message: "categorie trovate",categories});
  } catch (error) {
    next(error);
  }
}


async function store(req, res, next){
  

    try {
        const result = await prisma.category.create({
          data: req.body,
        });
    
        res.json({message: "categoria salvata", result});
      } catch (error) {
        next(error);
      }
}

async function destroy(req, res, next) {
    try {
      const categoryId = parseInt(req.params.id);
  
      const existingCategory = await prisma.category.findUnique({
        where: { id: categoryId },
      });
  
      if (!existingCategory) {
        next(new Error("categoria inesistente"));
      }
  
      const result = await prisma.category.delete({
        where: { id: categoryId },
      });
  
      res.json({ message: "Categoria eliminata", result });
    } catch (error) {
      next(error);
    }
  }


module.exports = {
  store,
  index,
  destroy
}