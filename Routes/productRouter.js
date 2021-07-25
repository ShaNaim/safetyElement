const { Router } = require("express");

const productController = require("../controller/productController");
const { route } = require("./homeRouter");

const router = Router();

router.get("/product", productController.productDetailView);

module.exports = router;
