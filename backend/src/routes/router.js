import express from "express"
const router = express.Router()

//prettier-ignore
import { 
  adminRegister, 
  userLogin, 
  verifyAccessGroup 
} from "../controllers/authController.js"

//prettier-ignore
import { 
  getUser, 
  getAllUsers, 
  adminUpdateUser, 
  updateUser, 
  adminCreateUser 
} from "../controllers/userController.js"

//prettier-ignore
import { 
  getAllGroups, 
  createGroup, 
  updateGroup
} from "../controllers/groupController.js"

//prettier-ignore
import { 
  createApp, 
  getApps, 
  getApp, 
  editApp, 
  getPermit 
} from "../controllers/applicationController.js"

//prettier-ignore
import { 
  getPlans, 
  createPlan, 
  editPlan, 
  getPlanNames 
} from "../controllers/planController.js"

//prettier-ignore
import { 
  createTask, 
  getTasks, 
  getTask, 
  editTask, 
  editTaskWithPlan, 
  editTaskWithState, 
  editTaskWithPlanState, 
  promoteDoingTask 
} from "../controllers/taskController.js"

//prettier-ignore
import { 
  checkJWT, 
  checkAdmin
} from "../middleware/auth.js"

//importing interceptors
// const {
//   isAuthenticatedUser,
//   authorizedAdmin
//  } = require("../middlewares/auth")
//repeat for each js file

//auth routes
//router.route("/register").post(checkJWT, adminRegister) //w
router.route("/auth/login").post(userLogin) //w
router.route("/verifyAccessGroup").post(checkJWT, verifyAccessGroup) //w //route for checkGroup

//update user details
router.route("/allUsers").get(checkJWT, checkAdmin, getAllUsers) //w
router.route("/admin/updateUser").post(checkJWT, checkAdmin, adminUpdateUser) //w
router.route("/updateUser").post(checkJWT, updateUser) //w
router.route("/getUser").get(checkJWT, getUser) //w
router.route("/createUser").post(checkJWT, checkAdmin, adminCreateUser) //w

//modify groups
router.route("/allGroups").get(checkJWT, checkAdmin, getAllGroups) //w
router.route("/createGroup").post(checkJWT, checkAdmin, createGroup) //w

router.route("/app/create").post(checkJWT, createApp) //w, no backend check for valid groups
router.route("/app/apps").get(checkJWT, getApps) //w
router.route("/app/app").post(checkJWT, getApp) //w
router.route("/app/edit").post(checkJWT, editApp) /// not able to test, unsure how this works

router.route("/plans").post(checkJWT, getPlans) //w
router.route("/plans/list").post(checkJWT, getPlanNames) //w
router.route("/plans/create").post(checkJWT, createPlan) //w, no check for valid appName
router.route("/plans/edit").post(checkJWT, editPlan) //w, no check for planName matching

//task functions
router.route("/task/create").post(checkJWT, createTask) //w
router.route("/tasks").post(checkJWT, getTasks) //w
router.route("/task").post(checkJWT, getTask) //w
router.route("/task/edit").post(checkJWT, editTask) //w
router.route("/task/editWithPlan").post(checkJWT, editTaskWithPlan) //w
router.route("/task/editWithState").post(checkJWT, editTaskWithState) //w
router.route("/task/editWithPlanState").post(checkJWT, editTaskWithPlanState) //w
router.route("/task/promoteDoingTask").post(checkJWT, promoteDoingTask) //w

//permit functions ???
//router.route("/app/permit").post(isAuthenticatedUser, getPermit)

export default router
