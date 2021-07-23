const { Router } = require("express");
const { requireGuest } = require("../middleWare/authMiddleware");
const authController = require("../controller/authController");

const router = Router();

router.get("/register", requireGuest, authController.registerView);
router.post("/register", requireGuest, authController.registerUser);
router.get("/login", requireGuest, authController.loginView);
router.post("/login", requireGuest, authController.userLogin);
router.get("/logout", authController.logout);
module.exports = router;
