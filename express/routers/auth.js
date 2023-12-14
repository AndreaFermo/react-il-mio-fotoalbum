const {Router} = require("express");
const router = Router();
const authController = require("../controllers/auth");
const { checkSchema } = require("express-validator");
const { checkValidity } = require("../middlewares/schemaValidator");
const register = require("../validations/register");
const login = require("../validations/login");


router.post("/register",checkSchema(register), checkValidity, authController.register);

router.post("/login",checkSchema(login), checkValidity, authController.login);

module.exports = router;