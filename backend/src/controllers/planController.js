import sql from "../config/query.js"

export const getPlans = async (req, res, next) => {
  //search for specific plan using appName
  try {
    const appName = req.body.appName

    //console.log(appName)
    const results = await sql.query(
      "SELECT * FROM plan WHERE Plan_app_Acronym = ? ",
      [appName]
    )
    if (results.length > 0 && results[0].length > 0) {
      res.status(200).json(results[0])
    } else {
      res.status(500).send("No plans found.")
    }
  } catch (err) {
    console.log("err")
    res.status(500).send(err)
  }
}

export const getPlanNames = async (req, res, next) => {
  //search for specific plan name using appName
  try {
    const appName = req.body.appName

    const results = await sql.query(
      "SELECT Plan_MVP_Name FROM plan WHERE Plan_app_Acronym = ? ",
      appName
    )
    if (results.length > 0 && results[0].length > 0) {
      res.status(200).json(results[0])
    } else {
      res.status(200).send("No plans found.")
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

export const createPlan = async (req, res) => {
  try {
    //be careful with naming
    const { planName, startDate, endDate, appName } = req.body
    if (!planName) {
      return res.status(500).send("Plan name missing.")
    }
    //check plan name valid
    const regex = "^[[a-zA-Z0-9_ ]+$"
    if (planName.length > 20) {
      return res.status(500).send("Plan name must be 20 characters or less.")
    }
    if (!planName.match(regex)) {
      return res.status(500).send("Plan name has illegal characters.")
    }

    //check dates valid (validateDates), else send error
    const startArr = new Date(startDate)
    const endArr = new Date(endDate)

    if (!startDate) res.status(500).send("Start date missing.")
    if (!endDate) res.status(500).send("End date missing.")

    if (startDate && endDate && startArr > endArr) {
      return res.status(500).send("Start date cannot be after end date.")
    }
    //check plan alr exists (findplan), else send error

    const findPlanQuery =
      "SELECT * FROM plan WHERE Plan_MVP_name = ? AND Plan_app_Acronym = ? "
    const [foundPlans] = await sql.query(findPlanQuery, [planName, appName])

    if (foundPlans.length > 1) {
      return res
        .status(500)
        .send(
          "Error: More than one plan with this name exists. Please contact an administrator."
        )
    }

    if (foundPlans.length === 1) {
      return res.status(500).send("Plan name already exists.")
    } else {
      sql.query(
        "INSERT INTO plan (Plan_MVP_name, Plan_startDate, Plan_endDate, Plan_app_Acronym) VALUES (?, ?, ?, ?)",
        [planName, startDate, endDate, appName]
      )
      return res.status(200).send("Successfully created plan.")
    }
  } catch (err) {
    return res.status(500).send(err)
  }
}

export const editPlan = async (req, res) => {
  //edit the named plan (planName) to modify startDate, endDate only
  //be careful with naming
  try {
    const { appName, planName, startDate, endDate } = req.body

    if (!appName) return res.status(500).send("App name missing.")

    if (!planName) return res.status(500).send("Plan name missing.")

    const startArr = new Date(startDate)
    const endArr = new Date(endDate)

    if (!startDate) return res.status(500).send("Start date missing.")
    if (!endDate) return res.status(500).send("End date missing.")

    if (startDate && endDate && startArr > endArr) {
      return res.status(500).send("Start date cannot be after end date.")
    }

    await sql.query(
      "UPDATE plan SET Plan_startDate = ?, Plan_endDate = ? WHERE Plan_MVP_name = ? AND Plan_app_Acronym = ? ",
      [startDate, endDate, planName, appName]
    )
    res.status(200).send("Successfully edited plan.")

    //res.end()
  } catch (err) {
    return res.status(500).send(err)
  }
}
