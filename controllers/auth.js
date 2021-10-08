var admin = require("firebase-admin");
const db = admin.firestore();

exports.authenticateUser = (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    console.log("GOT TOKEN");
    let token = req.headers.authorization.split(" ")[1];

    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        // save phoneNumber & uid in DB
        db.collection("users")
          .doc(uid)
          .set({
            userUid: uid,
            name: "",
            phoneNumber: decodedToken.phone_number,
            address: "",
            role: 0,
          })
          .then((result) => {
            res.json({
              msg: "Added user to the DB",
              user: {
                userUid: uid,
                name: "",
                phoneNumber: decodedToken.phone_number,
                address: "",
                role: 1,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({
              msg: "Not able to create user in DB",
              error: err,
            });
          });
      })
      .catch((error) => {
        // Handle error
        return res.status(400).json({
          error,
          msg: "User not verified",
        });
      });
  } else {
    return res.status(400).json({
      msg: "Token Not Found",
    });
  }
};

exports.isSignedIn = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    let authToken = req.headers.authorization.split(" ")[1];
    admin
      .auth()
      .verifyIdToken(authToken)
      .then((decodedToken) => {
        console.log("DECODED TOEK: ", decodedToken);
        req.auth = decodedToken;
        next();
      })
      .catch((error) => {
        // Handle error
        return res.status(400).json({
          error,
          msg: "User verification failed",
        });
      });
  } else {
    return res.status(400).json({
      msg: "No token found",
    });
  }
};

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile.userUid == req.auth.uid;
  console.log("CHECKER: ", checker);
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== 1) {
    return res.status(403).json({
      error: "You aren't ADMIN. Access Denied",
    });
  }
  next();
};
