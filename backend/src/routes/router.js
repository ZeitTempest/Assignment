import express from "express"
const router = express.Router()
import { adminRegister, userLogin, verifyAccessGroup } from "../controllers/authController.js"
import { getAllUsers, adminUpdateUser, updateUser } from "../controllers/userController.js"
import { getAllGroups, createGroup } from "../controllers/groupController.js"

import { checkJWT, checkAdmin } from "../middleware/auth.js"

//imported methods from controllers go here
// const {
//   loginUser,
//   verifyUser,
// } = require("../controllers/userController")

//importing interceptors
// const {
//   isAuthenticatedUser,
//   authorizedAdmin
//  } = require("../middlewares/auth")
//repeat for each js file

//auth routes
router.route("/register").post(checkJWT, adminRegister) //w
router.route("/auth/login").post(userLogin) //w
router.route("/verifyAccessGroup").post(checkJWT, verifyAccessGroup) //w

//update user details
router.route("/allUsers").get(checkJWT, checkAdmin, getAllUsers) //w
router.route("/admin/updateUser").post(checkJWT, checkAdmin, adminUpdateUser) //w
router.route("/updateUser").post(checkJWT, updateUser) //w

//modify groups
router.route("/allGroups").get(checkJWT, checkAdmin, getAllGroups) //w
router.route("/createGroup").post(checkJWT, checkAdmin, createGroup) //w
export default router
