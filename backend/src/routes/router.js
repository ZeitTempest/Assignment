import express from "express"
const router = express.Router()
import { adminRegister, userLogin, verifyAccessGroup } from "../controllers/authController.js"
import { checkJWT } from "../middleware/auth.js"
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
router.route("/allUsers").get(checkJWT, isAdmin, getAllUsers);
router.route("/admin/updateUser").post(checkJWT, isAdmin, adminUpdateUser);
router.route("/updateUser").post(checkJWT, updateUser);

export default router
