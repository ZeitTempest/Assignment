import jwt from "jsonwebtoken"
import { Checkgroup } from "../controllers/authController.js"
const secret = process.env.JWTSECRET

// export const checkJWT = async (req, res, next) => {
//   const token = req.headers["authorization"]

//   try {

//     var decoded = jwt.verify(token, secret)
//     console.log(decoded)

//     //console.log("auth middleware");
//     console.log(req.body)
//     next()
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: "invalid user credentials" })
//   }
// }

export const checkJWT = (req, res, next) => {
  // const authHeader = req.headers["authorization"]
  // const token = authHeader && authHeader.split(" ")[1]
  // //const token = authHeader.split(" ")[1]

  let token = false
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    //console.log(req.headers.authorization)
    token = req.headers.authorization.split(" ")[1]
  }

  if (token) {
    jwt.verify(token, secret, async (err, decoded) => {
      // console.log(decoded); // { username: 'admin', iat: 1707118235, exp: 1707121835 }
      if (err) {
        console.log(err)
        return res.status(401).send("Invalid JWT")
      }
      req.byUser = decoded.username
      next()
    })
  } else return res.status(401).send("No JWT")
}
export const checkAdmin = async (req, res, next) => {
  try {
    const username = req.byUser

    const isAdmin = await Checkgroup(username, "admin")
    //console.log("is admin: " + isAdmin)
    if (!isAdmin) {
      return res.status(403).send("Not admin")
    } else {
      //console.log(`${username} is admin`)
      next()
    }
  } catch (err) {
    console.log(err)
    return res.status(401).send("checkAdmin failed")
  }
}
