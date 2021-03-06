var admin = require("firebase-admin");
const db = admin.firestore();

exports.getProductById = (req, res, next, id) => {
  db.collection("products")
    .doc(id)
    .get()
    .then((doc) => {
      let {
        type,
        size,
        name,
        desc,
        avgSpeed,
        photoUrl,
        brakeType,
        gear,
        price,
        metValue,
        rating,
        discount,
        productId,
      } = doc.data();

      req.product = {
        type,
        size,
        name,
        description: desc,
        avgSpeed,
        photoUrl,
        price,
        brakeType,
        metValue,
        gear,
        rating,
        discount,
        productId,
      };
      console.log("Document data:", doc.data());
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        msg: "No Product Found in DB",
      });
    });
};

exports.getProduct = (req, res) => {
  if (req.product) {
    return res.json(req.product);
  } else {
    return res.status(400).json({
      msg: "No Product Found in DB",
    });
  }
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  let sortBy = req.query.sortBy ? req.query.sortBy : "productId";

  db.collection("products")
    .orderBy(sortBy, "asc")
    .limit(limit)
    .get()
    .then((snapshot) => {
      let products = snapshot.docs.map((doc) => {
        return doc.data();
      });
      return res.json(products);
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        msg: "Products not found in DB",
      });
    });
};
