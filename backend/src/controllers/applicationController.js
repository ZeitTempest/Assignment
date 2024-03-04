import sql from "../config/query.js"

export const createApp = async (req, res) => {
  // let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }
  // if (!token) {
  //   return res.send(false);
  // }
  //is token check necessary here?

  try {
    const { appname, description, startDate, endDate, create, open, todo, doing, done } = req.body

    //acronym(name) validity check
    const AcronymMeetsConstraints = new RegExp("^[a-zA-Z0-9]+$").test(appname)

    if (appname) {
      if (appname.length < 3 || appname.length > 20) {
        return res.status(500).send("App acronym must be between 3 - 20 characters.")
      }
      if (!AcronymMeetsConstraints) {
        return res.status(500).send("App acronym includes illegal characters.")
      }
    } else return res.status(500).send("Missing app acronym.")

    //dates validity check
    const startArr = new Date(startDate)
    const endArr = new Date(endDate)

    if (!startDate) res.status(500).send("Start date missing.")
    if (!endDate) res.status(500).send("End date missing.")

    if (startDate && endDate && startArr > endArr) {
      return res.status(500).send("Start date cannot be after end date.")
    }

    const checkAppQuery = `SELECT * FROM application WHERE appname = ? `
    const AppExists = await sql.query(checkAppQuery, appname)

    console.log(AppExists)

    if (AppExists.length !== 0) {
      return res.status(500).send("App acronym already exists.")
    }
    //prettier-ignore
    sql.query("INSERT INTO application ((App_Acronym, App_Description, App_startDate, App_endDate, App_permit_Create, App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"), 
    [
      appname, 
      description, 
      startDate, 
      endDate, 
      create,
      open, 
      todo, 
      doing, 
      done
    ]
  } catch (err) {
    res.status(500).send(err)
  }
}

export const getApps = async (req, res) => {
  console.log("getApps")
}

export const getApp = async (req, res) => {
  console.log("getApp")
}

export const editApp = async (req, res) => {
  console.log("editApp")
}

export const getPermit = async (req, res) => {
  console.log("getPermit")
}
