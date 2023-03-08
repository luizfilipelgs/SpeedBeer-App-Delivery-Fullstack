const express = require("express");
const registerController = require("../controllers/register.controller");
const {
  validateRegister,
  validateRegisterByAdm,
} = require("../middlewares/register.middleware");

const router = express.Router();

router.post("/", validateRegister, registerController.createUser);
router.post("/admin", validateRegisterByAdm, registerController.createUserByAdm);

module.exports = router;
