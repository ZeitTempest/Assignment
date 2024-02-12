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
router.route("/register").post(checkJWT, adminRegister)
router.route("/auth/login").post(userLogin)
router.route("/verifyAccessGroup").post(checkJWT, verifyAccessGroup)

//update user details
router.route("/allUsers").get(checkJWT, checkAdmin, getAllUsers);
router.route("/admin/updateUser").post(checkJWT, checkAdmin, adminUpdateUser);
router.route("/updateUser").post(checkJWT, updateUser);

//modify groups
router.route("/allGroups").get(checkJWT, checkAdmin, getAllGroups);
router.route("/createGroup").post(checkJWT, checkAdmin, createGroup);
export default router
