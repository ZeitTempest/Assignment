import sql from "../config/query.js"

//
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

function validatePlan(res, plan) {
  //returns true if error
  const regex = "^[a-zA-Z0-9]+$"
  if (plan.length > 20) {
    res.status(500).write("Plan length cannot exceed 20 characters.")
    return true
  }
  if (!plan.match(regex)) {
    res.status(500).write("Plan contains illegal characters.")
    return true
  }
  return false
}

export const getTask = async (req, res) => {
  const { task } = req.body
  if (task) {
    try {
      sql.query("SELECT * FROM task WHERE Task_id = ? ", [task], function (err, results) {
        if (err) {
          console.log(err)
        } else {
          res.status(200).json(results)
        }
      })
    } catch (err) {
      console.log(err)
    }
  } else {
    res.status(500).send("Missing task.")
  }
}

export const getTasks = async (req, res) => {
  // get all tasks in a given state
  const { state, appName } = req.body
  if (state) {
    try {
      sql.query("SELECT * from task WHERE Task_state = ? AND Task_app_Acronym = ? ", [state, appName], function (err, results) {
        if (err) {
          console.log(err)
        } else {
          res.json(results)
        }
      })
    } catch (err) {
      console.log(err)
    }
  } else return res.status(500).send("Error: given state missing.")
}

export const createTask = async (req, res) => {
  //careful with names!
  const { taskName, description, notes, plan, name, createDate } = req.body
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const username = decoded.username

  if (!taskName) return res.status(500).send("Failed to create task: missing task name")

  const regex = "^[a-zA-Z0-9]+$"
  let error = false

  //task valid check
  if (task.length < 3 || task.length > 20) {
    return res.status(500).send("Task name must be between 3 - 20 characters.")
  }
  if (!task.match(regex)) {
    return res.status(500).send("Task name contains illegal characters.")
  }

  //plan valid check
  if (plan && validatePlan(res, plan)) {
    return res.send()
  }

  try {
    //get App_Rnumber from the associated application
    const rNumberQuery = "SELECT App_Rnumber FROM application WHERE App_Acronym = ?"

    const rNumber = (await sql.query(rNumberQuery, appName)) + 1
    const taskId = name + "_" + rNumber

    //check if task already exists
    const taskExistsQuery = "SELECT * FROM task WHERE Task_id = ?"
    const taskExists = await sql.query(taskExistsQuery, taskId)

    if (taskExists) {
      res.status(500).send("The task you are attempting to create already exists.")
    }

    //double check this logic: where do the previous audit entries get appended?
    let audit = null
    if (notes) {
      const time = new Date()
      const state = "create"
      audit = `${username}, ${state}, ${time}: ${notes}`
    }
    //prettier-ignore
    sql.query(
      "BEGIN; INSERT INTO task (Task_name, Task_description, Task_notes, Task_id, Task_plan, Task_app_Acronym, Task_creator, Task_owner, Task_createDate) VALUES (?,?,?,?,?,?,?,?,?); UPDATE application SET App_Rnumber = ? WHERE App_Acronym = ?; COMMIT", 
      [
        taskName,
        description, 
        audit, 
        taskId, 
        plan, 
        name, 
        username, 
        username, 
        createDate, 
        rNumber, 
        name
      ], 
      function (err, results) {
        if (err) {
          console.log(err)
        } else {
          res.status(200).send("Successfully created task.")
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
}

export const editTask = async (req, res) => {
  try {
    const { description, notes, taskId, state } = req.body
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const username = decoded.username
    const time = new Date()
    const audit = `${username}, ${state}, ${time}: ${notes}`
    sql.query("UPDATE task SET Task_description = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ? WHERE task_id = ?", [description, audit, username, taskId], function (err, results) {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("Successfully edited task.")
      }
    })
    //res.end()
  } catch (err) {
    console.log(err)
  }
}
export const editTaskWithPlan = async (req, res) => {
  try {
    const { description, plan, notes, taskId, state } = req.body
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const username = decoded.username
    const time = new Date()

    if (plan && validatePlan(res, plan)) {
      res.send()
      return
    }
    const audit = `${username}, ${state}, ${time}: ${notes}`
    sql.query("UPDATE task SET Task_description = ?, Task_plan = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ? WHERE task_id = ?", [description, plan, audit, username, taskId], function (err, results) {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("Successfully edited task.")
      }
    })
    //res.end()
  } catch (err) {
    console.log(err)
  }
}

export const editTaskWithPlanState = async (req, res) => {
  try {
    const { description, plan, notes, taskId, state, newState } = req.body
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const username = decoded.username
    const time = new Date()
    if (plan && validatePlan(res, plan)) {
      res.send()
      return
    }
    const audit = `${username}, ${state}, ${time}: ${notes}`
    sql.query("UPDATE task SET Task_description = ?, Task_plan = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ?, Task_state = ? WHERE task_id = ?", [description, plan, audit, username, newState, taskId], function (err, results) {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("Successfully edited and promoted task.")
      }
    })
    //res.end()
  } catch (err) {
    console.log(err)
  }
}

export const editTaskWithState = async (req, res) => {
  try {
    const { description, notes, task, state, newState } = req.body
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const username = decoded.username
    const time = new Date()
    const audit = `${username}, ${state}, ${time}: ${notes}`
    sql.query("UPDATE task SET Task_description = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ?, Task_state = ? WHERE task_id = ?", [description, audit, username, newState, task], function (err, results) {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("Successfully edited and promoted task.")
      }
    })
    //res.end()
  } catch (err) {
    console.log(err)
  }
}

export const promoteDoingTask = async (req, res) => {
  try {
    const { description, notes, plan, task, state, newState, app } = req.body
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const username = decoded.username
    const time = new Date()
    const audit = `${username}, ${state}, ${time}: ${notes}`
    if (plan && validatePlan(res, plan)) {
      res.send()
      return
    }
    sql.query("UPDATE task SET Task_description = ?, Task_notes = CONCAT_WS(CHAR(13), ?, Task_notes), Task_owner = ?, Task_state = ?, Task_plan = ? WHERE task_id = ?", [description, audit, username, newState, plan, task], function (err, results) {
      if (err) {
        console.log(err)
      } else {
        //sendEmail(app)
        console.log("email gets sent here")
        res.status(200).send("Successfully edited and promoted task to 'Done'.")
      }
    })
    //res.end()
  } catch (err) {
    console.log(err)
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
