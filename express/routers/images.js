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

router.post("/", authHandler, multer({ storage: storage }).single("image"), imagesController.store);

router.get("/:id", authHandler, imagesController.show);

router.put("/:id", authHandler, multer({ storage: storage }).single("image"), imagesController.update);

router.delete("/:id", authHandler, imagesController.destroy);

module.exports = router;