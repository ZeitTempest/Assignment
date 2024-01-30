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

router.get("/", (req, res) => {
  res.send("Hello world!")
})

router.post("/", (req, res) => {
  res.send("Request received, this is a response")
})
