var admin = require("firebase-admin");
const db = admin.firestore();

exports.getUserById = (req, res, next, id) => {
  db.collection("users")
    .doc(id)
    .get()
    .then((doc) => {
      let { userUid, name, phoneNumber, address, role } = doc.data();
      req.profile = {
        userUid,
        name,
        phoneNumber,
        address,
        role,
      };
      console.log("Document data:", doc.data());
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        msg: "No User Found in DB",
      });
    });
};
