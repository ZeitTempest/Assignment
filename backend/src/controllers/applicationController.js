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
  //is token check necessary in every function?

  try {
    //ensure they are named correctly in request!
    //prettier-ignore
    const { 
      appName, 
      description, 
      startDate,
      endDate, 
      create, 
      open, 
      todo, 
      doing, 
      done 
    } = req.body

    //acronym(name) validity check
    const AcronymMeetsConstraints = new RegExp("^[a-zA-Z0-9]+$").test(appName)

    if (appName) {
      if (appName.length < 3 || appName.length > 20) {
        return res.status(500).send("App name must be between 3 - 20 characters.")
      }
      if (!AcronymMeetsConstraints) {
        return res.status(500).send("App name includes illegal characters.")
      }
    } else return res.status(500).send("Missing app name.")

    //dates validity check
    if (!startDate) res.status(500).send("Start date missing.")
    if (!endDate) res.status(500).send("End date missing.")

    const startArr = new Date(startDate)
    const endArr = new Date(endDate)

    if (isNaN(startArr.getTime())) {
      return res.status(500).send("Start date is invalid.")
    }

    if (isNaN(endArr.getTime())) {
      return res.status(500).send("End date is invalid.")
    }

    if (startDate && endDate && startArr > endArr) {
      return res.status(500).send("Start date cannot be after end date.")
    }

    const checkAppQuery = `SELECT * FROM application WHERE App_Acronym = ? `
    const AppExists = await sql.query(checkAppQuery, appName)

    //console.log(AppExists[0])

    if (AppExists[0].length !== 0) {
      return res.status(500).send("App name already exists.")
    }
    //prettier-ignore
    sql.query("INSERT INTO application (App_Acronym, App_Description, App_startDate, App_endDate, App_permit_Create, App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [
      appName, 
      description, 
      startDate, 
      endDate, 
      create,
      open, 
      todo, 
      doing, 
      done
    ])
    return res.status(200).send("Successfully created application.")
  } catch (err) {
    res.status(500).send(err)
  }
}

export const getApps = async (req, res) => {
  //list all rows in applications table
  try {
    const results = await sql.query("SELECT * FROM application")
    if (results.length > 0) {
      res.status(200).json(results[0])
    } else {
      res.status(500).send("No applications found.")
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

export const getApp = async (req, res, next) => {
  //find specific row in applications table by App_Acronym

  try {
    //ensure this is named correctly in frontend
    const appName = req.body.appName
    const results = await sql.query("SELECT * FROM application WHERE App_Acronym = ? ", appName)
    if (results.length > 0 && results[0].length > 0) {
      res.status(200).json(results[0])
    } else {
      res.status(200).send("No applications found.")
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

export const editApp = async (req, res) => {
  try {
    //prettier-ignore
    const { 
      appName, 
      description, 
      startDate,
      endDate, 
      create, 
      open, 
      todo, 
      doing, 
      done 
    } = req.body

    //App_Acronym should never be missing
    if (!appName) return res.status(500).send("App_Acronym not found.")

    //neither date should ever be missing
    if (!startDate) res.status(500).send("Start date cannot be blank.")
    if (!endDate) res.status(500).send("End date cannot be blank.")

    const startArr = new Date(startDate)
    const endArr = new Date(endDate)

    if (startDate && endDate && startArr > endArr) {
      return res.status(500).send("Start date cannot be after end date.")
    }

    //the check is to query as long as value is not undefined (null is not undefined)
    if (description) {
      sql.query("UPDATE application SET App_Description = ? WHERE App_Acronym = ? ", [description, appName])
    }
    if (startDate || startDate === null) {
      sql.query("UPDATE application SET App_startDate = ? WHERE App_Acronym = ? ", [startDate, appName])
    }
    if (endDate || endDate === null) {
      sql.query("UPDATE application SET App_endDate = ? WHERE App_Acronym = ? ", [endDate, appName])
    }
    if (open || open === null) {
      sql.query("UPDATE application SET App_permit_Open = ? WHERE App_Acronym = ? ", [open, appName])
    }
    if (todo || todo === null) {
      sql.query("UPDATE application SET App_permit_todoList = ? WHERE App_Acronym = ? ", [todo, appName])
    }
    if (doing || doing === null) {
      sql.query("UPDATE application SET App_permit_Doing = ? WHERE App_Acronym = ? ", [doing, appName])
    }
    if (done || done === null) {
      sql.query("UPDATE application SET App_permit_Done = ? WHERE App_Acronym = ? ", [done, appName])
    }
    if (create || create === null) {
      sql.query("UPDATE application SET App_permit_Create = ? WHERE App_Acronym = ? ", [create, appName])
    }
    return res.status(200).send("Successfully updated application.")
  } catch (err) {
    return res.status(500).send(err)
  }
}

export const getPermit = async (req, res) => {
  //for frontend route to call
  //get the group with permission to edit current state so u can run checkgroup on it
  try {
    const { appName } = req.body
    //console.log(req.body)
    const results = await sql.query("SELECT * FROM application WHERE App_Acronym = ? ", [appName])
    res.json(results[0])
  } catch (err) {
    console.log(err)
  }
}

export const getDonePermit = async appName => {
  try {
    const results = await sql.query("SELECT * FROM application WHERE App_Acronym = ? ", [appName])
    const permit = results[0][0].App_permit_Done
    return permit
  } catch (err) {
    console.log(err)
  }
}
