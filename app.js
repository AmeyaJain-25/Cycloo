require("dotenv").config();
//-----------------
//FIREBASE SETUP
var admin = require("firebase-admin");
const config = require("./config/firebaseService.js").config;
//Firebase Service Key
const serviceAccount = JSON.parse(JSON.stringify(config));

//Firebase Initialize App
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
//-------------------------------------------

//Import statements
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//-----------------
//MIDDLEWARES
//app.use helps to use those as a middleware
app.use(express.json()); //Body Parser
app.use(cors());

//------------------
//ROUTES
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//------------------
//PORT
const port = process.env.PORT || 8000; //For keeping secure.  //Take port value from environment OR(||) Take default as 8000

//------------------
//STARTING A SERVER
app.listen(port, () => console.log(`App is Running at ${port}`));
