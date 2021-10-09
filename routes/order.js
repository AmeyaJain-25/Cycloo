const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getOrderById,
  getOrder,
  getMyAllOrders,
  createOrder,
} = require("../controllers/order");
const { getUserById } = require("../controllers/user");
const router = express.Router();

//PARAMS
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Creating Order
router.post("/order/create/:userId", isSignedIn, isAuthenticated, createOrder);

//Get Order
router.get("/order/:orderId/:userId", isSignedIn, isAuthenticated, getOrder);

router.get("/myorders/:userId", isSignedIn, isAuthenticated, getMyAllOrders);

module.exports = router;
