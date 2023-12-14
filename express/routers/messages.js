const {Router} = require('express');
const router = Router();
const messagesController = require("../controllers/messages");
const authHandler = require("../middlewares/authHandler");


router.get("/",authHandler, messagesController.index);
router.post("/", messagesController.store);

module.exports = router;