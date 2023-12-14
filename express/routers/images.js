const express = require("express");
const router = express.Router();
const imagesController = require("../controllers/images");
const multer = require("multer");
const authHandler = require("../middlewares/authHandler");
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, `public/`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

router.get("/public", imagesController.publicIndex);
router.get("/public/:id", imagesController.publicShow);

router.get("/", authHandler, imagesController.index);

router.post("/", authHandler, multer({ storage: storage }).single("image"),
    body('title')
        .trim() 
        .isLength({ min: 1 }).withMessage('Il titolo è obbligatorio')
        .isLength({ max: 100 }).withMessage('Il titolo deve essere lungo al massimo 100 caratteri'),
    body('description')
        .trim()
        .isLength({ min: 1 }).withMessage('La descrizione è obbligatoria')
        .isLength({ max: 500 }).withMessage('la descrizione deve essere lunga al massimo 500 caratteri'),
    body('published')
        .notEmpty().withMessage('Pubblicato è obbligatorio')
        .isBoolean().withMessage('Pubblicato deve essere un buleano'),
    body('categories'),
    body('image').optional(),
    body('userId').notEmpty().withMessage("L'id del pubblicante ѐ obbligatorio").isInt().withMessage("L'id del pubblicante deve essere un intero"),

 

imagesController.store);

router.get("/:id", authHandler, imagesController.show);

router.put("/:id", authHandler , multer({ storage: storage }).single("image"), 
    body('title')
        .trim()
        .isLength({ min: 1 }).withMessage('Il titolo è obbligatorio')
        .isLength({ max: 100 }).withMessage('Il titolo deve essere lungo al massimo 100 caratteri'),
    body('description')
        .trim()
        .isLength({ min: 1 }).withMessage('La descrizione è obbligatoria')
        .isLength({ max: 500 }).withMessage('la descrizione deve essere lunga al massimo 500 caratteri'),
    body('published')
        .notEmpty()
        .isBoolean(),
    body('categories').optional(),
    body('image').optional(),
    body('userId')
        .notEmpty().withMessage("L'id del pubblicante ѐ obbligatorio")
        .isInt().withMessage("L'id del pubblicante deve essere un intero"),

imagesController.update);

router.delete("/:id", authHandler, imagesController.destroy);

module.exports = router;