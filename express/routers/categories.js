const {Router} = require('express');
const router = Router();
const categoriesController = require("../controllers/categories");
const authHandler = require("../middlewares/authHandler")

router.get("/", categoriesController.index)
router.post("/", authHandler, categoriesController.store)
router.delete("/:id", authHandler, categoriesController.destroy)

module.exports = router;