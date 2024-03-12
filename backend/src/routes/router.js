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
  isAuthenticatedUser,
  checkAdmin
} from "../middleware/auth.js"

//auth routes
//router.route("/register").post(checkJWT, adminRegister) //w
router.route("/auth/login").post(userLogin) //w
router.route("/verifyAccessGroup").post(checkJWT, verifyAccessGroup) //w //route for checkGroup

//update user details
router.route("/allUsers").get(checkJWT, isAuthenticatedUser, checkAdmin, getAllUsers) //w
router.route("/admin/updateUser").post(checkJWT, isAuthenticatedUser, checkAdmin, adminUpdateUser) //w
router.route("/updateUser").post(checkJWT, isAuthenticatedUser, updateUser) //w
router.route("/getUser").get(checkJWT, isAuthenticatedUser, getUser) //w
router.route("/createUser").post(checkJWT, isAuthenticatedUser, checkAdmin, adminCreateUser) //w

//modify groups
router.route("/allGroups").get(checkJWT, isAuthenticatedUser, getAllGroups) //w
router.route("/createGroup").post(checkJWT, isAuthenticatedUser, checkAdmin, createGroup) //w

router.route("/app/create").post(checkJWT, isAuthenticatedUser, createApp) //w, no backend check for valid groups
router.route("/app/apps").get(checkJWT, isAuthenticatedUser, getApps) //w
router.route("/app/app").post(checkJWT, isAuthenticatedUser, getApp) //w
router.route("/app/edit").post(checkJWT, isAuthenticatedUser, editApp) /// not able to test, unsure how this works

router.route("/plans").post(checkJWT, isAuthenticatedUser, getPlans) //w
router.route("/plans/list").post(checkJWT, isAuthenticatedUser, getPlanNames) //w
router.route("/plans/create").post(checkJWT, isAuthenticatedUser, createPlan) //w, no check for valid appName
router.route("/plans/edit").post(checkJWT, isAuthenticatedUser, editPlan) //w, no check for planName matching

//task functions
router.route("/task/create").post(checkJWT, isAuthenticatedUser, createTask) //w
router.route("/tasks").post(checkJWT, isAuthenticatedUser, getTasks) //w
router.route("/task").post(checkJWT, isAuthenticatedUser, getTask) //w
router.route("/task/edit").post(checkJWT, isAuthenticatedUser, editTask) //w
router.route("/task/editWithPlan").post(checkJWT, isAuthenticatedUser, editTaskWithPlan) //w
router.route("/task/editWithState").post(checkJWT, isAuthenticatedUser, editTaskWithState) //w
router.route("/task/editWithPlanState").post(checkJWT, isAuthenticatedUser, editTaskWithPlanState) //w
router.route("/task/promoteDoingTask").post(checkJWT, isAuthenticatedUser, promoteDoingTask) //w

//permit functions
router.route("/app/permit").post(checkJWT, isAuthenticatedUser, getPermit)

export default router
