var admin = require("firebase-admin");
const db = admin.firestore();
const { v4: uuidv4, v4 } = require("uuid");

exports.getOrderById = (req, res, next, id) => {
  db.collection("orders")
    .doc(id)
    .get()
    .then((doc) => {
      let {
        orderBy,
        status,
        address,
        amount,
        products,
        orderId,
        paymentMethod,
        orderDate,
      } = doc.data();

      req.order = {
        orderBy,
        status,
        address,
        amount,
        products,
        orderId,
        paymentMethod,
        orderDate,
      };
      console.log("Document data:", doc.data());
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        msg: "No Order Found in DB",
      });
    });
};

exports.getOrder = (req, res) => {
  if (req.order) {
    return res.json(req.order);
  } else {
    return res.status(400).json({
      msg: "No Order Found in DB",
    });
  }
};

exports.createOrder = (req, res) => {
  let {
    orderBy,
    status,
    address,
    amount,
    name,
    products,
    paymentMethod,
    contactNumber,
  } = req.body;
  if (
    !orderBy ||
    !status ||
    !address ||
    !amount ||
    !name ||
    products.length < 1 ||
    !paymentMethod ||
    !contactNumber
  ) {
    return res.status(400).json({
      msg: "All fields are required. Fill all of them",
    });
  }

  let newOrderId = v4();

  let newOrder = {
    orderBy,
    status,
    address,
    amount,
    name,
    products,
    paymentMethod,
    contactNumber,
    orderDate: Date.now(),
    orderId: newOrderId,
  };

  db.collection("orders")
    .doc(newOrderId)
    .set(newOrder)
    .then((result) => {
      console.log(result);
      return res.json(newOrder);
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        msg: "Not able to save the order in DB",
      });
    });
};

exports.getMyAllOrders = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  db.collection("orders")
    .where("orderBy", "==", req.profile.userUid)
    .limit(limit)
    .get()
    .then((snapshot) => {
      let products = snapshot.docs.map((doc) => {
        return doc.data();
      });
      products.reverse();
      return res.json(products);
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        msg: "Orders not found in DB",
      });
    });
};
