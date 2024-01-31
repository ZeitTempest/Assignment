const express = require("express")
const router = express.Router()

//imported methods from controllers go here
// const {
//   loginUser,
//   verifyUser,
// } = require("../controllers/userController")
//in that file, each of these must be an exported property

//importing interceptors
// const {
//   isAuthenticatedUser,
//   authorizedAdmin
//  } = require("../middlewares/auth")
//repeat for each js file
const { loginUser } = require("../controllers/userController")

router.route("/auth/login").post(loginUser)
// router.post("/", (req, res) => {
//   if (req.name) {
//     res.body.testProp = `Request with name ${req.name} received.`
//   }
// })

//example requests
// router.get("/", (req, res) => {
//   if (req.name) {
//     res.send(`~Hi, ${req.name}. Request received!`)
//   }
//   res.send("This is your response!")
// })

// router.post("/", (req, res) => {
//   res.send("Request received, this is a response")
// })

module.exports = router
