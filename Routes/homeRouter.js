const { Router } = require("express");

const homeController = require("../controller/homeController");

const router = Router();

router.get("", homeController.homeView);

module.exports = router;
