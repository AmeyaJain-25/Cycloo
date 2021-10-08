const express = require("express");
const { authenticateUser } = require("../controllers/auth");
const router = express.Router();

//Create User
router.post("/authenticate", authenticateUser);

module.exports = router; //Exporting all the routes
