import sql from "../config/query.js"

//
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

function validatePlan(res, plan) {
  //returns true if error
  const regex = "^[a-zA-Z0-9]+$"
  if (plan.length > 20) {
    res.status(500).write("Plan name cannot exceed 20 characters.")
    return true
  }
  if (!plan.match(regex)) {
    res.status(500).write("Plan name contains illegal characters.")
    return true
  }
  return false
}

export const getTask = async (req, res) => {
  //get a single task row by querying with task_id
  const { taskId } = req.body
  console.log(taskId)
  if (taskId) {
    try {
      const results = await sql.query("SELECT * FROM task WHERE Task_id = ? ", taskId)
      //console.log(results[0][0])
      if (results[0].length > 0) {
        res.status(200).json(results[0][0])
      } else {
        res.status(500).send("Task with this name not found.")
      }
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}

export const getTasks = async (req, res) => {
  // get all tasks in a given state
  const { state, appName } = req.body
  if (state) {
    try {
      const results = await sql.query("SELECT * from task WHERE Task_state = ? AND Task_app_Acronym = ? ", [state, appName])
      if (results[0].length > 0) {
        res.status(200).json(results[0])
      } else {
        res.status(500).send("Task with this name not found.")
      }
    } catch (err) {
      return res.status(500).send(err)
    }
  } else return res.status(500).send("Error: given state missing.")
}

export const createTask = async (req, res) => {
  //careful with names!
  const { taskName, description, notes, plan, appName, createDate } = req.body
  const username = req.byUser

  //console.log("username: " + username)

  if (!taskName) return res.status(500).send("Failed to create task: missing task name")

  const regex = "^[a-zA-Z0-9]+$"
  let error = false

  //task valid check
  if (taskName.length < 3 || taskName.length > 20) {
    return res.status(500).send("Task name must be between 3 - 20 characters.")
  }
  if (!taskName.match(regex)) {
    return res.status(500).send("Task name contains illegal characters.")
  }

  //plan valid check
  if (plan && validatePlan(res, plan)) {
    return res.send()
  }

  try {
    //get App_Rnumber from the associated application
    const rNumberQuery = "SELECT App_Rnumber FROM application WHERE App_Acronym = ?"

    //const rNumber = (await sql.query(rNumberQuery, appName)[0]) + 1

    const rNumberResult = await sql.query(rNumberQuery, appName)

    const rNumber = rNumberResult[0][0].App_Rnumber + 1

    const taskId = appName + "_" + rNumber

    //check if task already exists
    const taskExistsQuery = "SELECT * FROM task WHERE Task_id = ?"
    const taskExists = await sql.query(taskExistsQuery, taskId)

    console.log(taskExists[0])
    if (taskExists[0].length > 0) {
      return res.status(500).send("The task you are attempting to create already exists.")
    }

    //double check this logic: where do the previous audit entries get appended?
    let audit = null
    if (notes) {
      const time = new Date()
      const state = "create"
      audit = `${username}, ${state}, ${time}: ${notes}`
    }
    try {
      //prettier-ignore
      sql.query("INSERT INTO task (Task_name, Task_description, Task_notes, Task_id, Task_plan, Task_app_Acronym, Task_creator, Task_owner, Task_createDate) VALUES (?,?,?,?,?,?,?,?,?);", [taskName, description, audit, taskId, plan, appName, username, username, createDate], function (err, results) {})
    } catch (err) {
      console.log(err)
      res.status(500).send("insert query error")
    }

    try {
      sql.query("UPDATE application SET App_Rnumber = ? WHERE App_Acronym = ?;", [rNumber, appName])
      res.status(200).send("Task created")
    } catch (err) {
      console.log(err)
      return res.status(500).send("update query error")
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send("some other error")
  }
}

export const editTask = async (req, res) => {
  //edit the task selected using task_id
  try {
    const { description, notes, taskId, state } = req.body
    const username = req.byUser
    const time = new Date()
    const audit = `${username}, ${state}, ${time}: ${notes}`
    sql.query("UPDATE task SET Task_description = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ? WHERE task_id = ?", [description, audit, username, taskId])
    res.status(200).send("Successfully edited task.")
  } catch (err) {
    return res.status(500).send(err)
  }
}
export const editTaskWithPlan = async (req, res) => {
  try {
    const { description, plan, notes, taskId, state } = req.body
    const username = req.byUser
    const time = new Date()

    if (plan && validatePlan(res, plan)) {
      console.log("plan failed validation")
      return res.send()
    }
    const audit = `${username}, ${state}, ${time}: ${notes}`
    sql.query("UPDATE task SET Task_description = ?, Task_plan = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ? WHERE task_id = ?", [description, plan, audit, username, taskId])
    res.status(200).send("Successfully edited task.")
  } catch (err) {
    return res.status(500).send(err)
  }
}

export const editTaskWithState = async (req, res) => {
  try {
    const { description, notes, taskId, state, newState } = req.body
    const username = req.byUser
    const time = new Date()
    const audit = `${username}, ${state}, ${time}: ${notes}`
    sql.query("UPDATE task SET Task_description = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ?, Task_state = ? WHERE task_id = ?", [description, audit, username, newState, taskId])

    res.status(200).send("Successfully edited and promoted task.")
  } catch (err) {
    return res.status(500).send(err)
  }
}

export const editTaskWithPlanState = async (req, res) => {
  try {
    const { description, plan, notes, taskId, state, newState } = req.body

    const username = req.byUser

    const time = new Date()
    if (plan && validatePlan(res, plan)) {
      res.send()
      return
    }
    const audit = `${username}, ${state}, ${time}: ${notes}`
    sql.query("UPDATE task SET Task_description = ?, Task_plan = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ?, Task_state = ? WHERE task_id = ?", [description, plan, audit, username, newState, taskId])
    res.status(200).send("Successfully edited and promoted task.")
  } catch (err) {
    console.log(err)
    return res.status(500).send("asd")
  }
}

export const promoteDoingTask = async (req, res) => {
  try {
    const { description, notes, taskId, state, newState, appName } = req.body
    const username = req.byUser
    const time = new Date()
    const audit = `${username}, ${state}, ${time}: ${notes}`

    sql.query("UPDATE task SET Task_description = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ?, Task_state = ? WHERE task_id = ?", [description, audit, username, newState, taskId])

    //sendEmail(appName)
    console.log("email gets sent here")
    res.status(200).send("Successfully edited and promoted task to 'Done'.")
    //res.end()
  } catch (err) {
    return res.status(500).send(err)
  }
}

// async function sendEmail(app, username) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_USERNAME,
//       pass: process.env.SMTP_PASSWORD
//     }
//   })
//   const group = await getDonePermit(app)
//   if (group) {
//     const sender = username
//     const permitUsers = await getAllPermitDoneEmails(group)
//     const emails = []
//     permitUsers.forEach(user => {
//       if (user.email.length > 0) {
//         emails.push(user.email)
//       }
//     })
//     emails.forEach(email => {
//       const content = {
//         from: sender,
//         to: email,
//         subject: "Approval of done task",
//         text: "Submitting task for approval."
//       }
//       transporter.sendMail(content, function (err, info) {
//         if (err) {
//           console.log(err)
//         }
//       })
//     })
//   }
// }