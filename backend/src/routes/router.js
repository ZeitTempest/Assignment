import express from "express"
const router = express.Router()

import { 
  adminRegister, 
  userLogin, 
  verifyAccessGroup 
} from "../controllers/authController.js"

import { 
  getUser, 
  getAllUsers, 
  adminUpdateUser, 
  updateUser, 
  adminCreateUser 
} from "../controllers/userController.js"

import { 
  getAllGroups, 
  createGroup 
} from "../controllers/groupController.js"

import { 
  createApp,
  getApps,
  getApp,
  editApp,
  getPermit,
} from "../controllers/applicationController.js"

import { 
  getPlans,
  createPlan,
  editPlan,
  getPlanNames,
} from "../controllers/planController.js"

import { 
  createTask,
  getTasks,
  getTask,
  editTask,
  editTaskWithPlan,
  editTaskWithState,
  editTaskWithPlanState,
  promoteDoingTask,
} from "../controllers/taskController.js"

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
router.route("/verifyAccessGroup").post(checkJWT, verifyAccessGroup) //w

//update user details
router.route("/allUsers").get(checkJWT, checkAdmin, getAllUsers) //w
router.route("/admin/updateUser").post(checkJWT, checkAdmin, adminUpdateUser) //w
router.route("/updateUser").post(checkJWT, updateUser) //w
router.route("/getUser").get(checkJWT, getUser) //w
router.route("/createUser").post(checkJWT, checkAdmin, adminCreateUser) //w

//modify groups
router.route("/allGroups").get(checkJWT, checkAdmin, getAllGroups) //w
router.route("/createGroup").post(checkJWT, checkAdmin, createGroup) //w

//
router.route("/updateGroup").post(checkJWT, checkAdmin)

router.route("/app/create").post(checkJWT, createApp)
router.route("/app/apps").get(checkJWT, getApps)
router.route("/app/app").post(checkJWT, getApp)
router.route("/app/edit").post(checkJWT, editApp)

router.route("/plans").post(checkJWT, getPlans)
router.route("/plans/list").post(checkJWT, createPlan)
router.route("/plans/create").post(checkJWT, editPlan)
router.route("/plans/edit").post(checkJWT, getPlanNames)

//task functions
router.route("/task/create").post(checkJWT, createTask);
router.route("/tasks").post(checkJWT, getTasks);
router.route("/task").post(checkJWT, getTask);
router.route("/task/edit").post(checkJWT, editTask);
router.route("/task/editWithPlan").post(checkJWT, editTaskWithPlan);
router
  .route("/task/editWithPlanState")
  .post(checkJWT, editTaskWithState);
router
  .route("/task/editWithState")
  .post(checkJWT, editTaskWithPlanState);
router
  .route("/task/promoteDoingTask")
  .post(checkJWT, promoteDoingTask);

//permit functions ???
//router.route("/app/permit").post(isAuthenticatedUser, getPermit);

export default router
