const { Router } = require("express");
const userController = require("../controller/userController");
const { requireAuth } = require("../middleWare/authMiddleware");

const router = Router();
console.log("In router");
router.get("/user", requireAuth, userController.userProfileView);

module.exports = router;
