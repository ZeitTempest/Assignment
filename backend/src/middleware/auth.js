import jwt from "jsonwebtoken"
const secret = process.env.JWTSECRET

export const checkJWT = async (req, res, next) => {
  const token = req.headers["x-access-token"]
  const token2 = req.headers["authorization"]
  //console.log(token)
  //console.log(token2)
  try {
    var decoded = jwt.verify(token, secret)
    console.log(decoded)

    //console.log("auth middleware");
    console.log(req.body)
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "invalid user credentials" })
  }
}

// export const checkJWT = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   jwt.verify(token, secret, async (err, decoded) => {
//     // console.log(decoded); // { username: 'admin', iat: 1707118235, exp: 1707121835 }
//     if (err) {
//       return res.status(403).send("Invalid token");
//     }

//     req.byUser = decoded.username;
//     next();
//   });
// };


export const checkAdmin = async (req, res, next) => {
  try {
    const username = req.byUser;
    const isAdmin = await Checkgroup(username, "admin");
    console.log(isAdmin);
    if (!isAdmin) {
      return res.status(403).send("not admin");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
