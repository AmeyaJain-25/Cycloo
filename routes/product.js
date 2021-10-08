const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getProductById,
  getProduct,
  getAllProducts,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const router = express.Router();

//PARAMS
router.param("userId", getUserById);
router.param("productId", getProductById);

//Get Product
router.get("/product/:productId", getProduct);

//Listing Product(Getting products on Home Page)
router.get("/products", getAllProducts);

module.exports = router;
