import sql from "../config/query.js"

export const getPlans = async (req, res, next) => {
  //search for specific plan using acronym
  const name = req.body.appName
  sql.query("SELECT * FROM plan WHERE Plan_app_Acronym = ? ", name, function (error, results) {
    if (error) {
      console.log(error)
    } else {
      res.json(results)
    }
  })
}

export const getPlanNames = async (req, res, next) => {
  //search for specific plan name using acronym
  const name = req.body.appName
  sql.query("SELECT Plan_MVP_name FROM plan WHERE Plan_app_Acronym = ? ", name, function (error, results) {
    if (error) {
      console.log(error)
    } else {
      res.json(results)
    }
  })
}

export const createPlan = async (req, res) => {
  try {
    //be careful with naming
    const { planName, startDate, endDate, appName } = req.body
    if (planName) {
      //check plan name valid
      const regex = "^[[a-zA-Z0-9_ ]+$"
      if (plan.length > 20) {
        return res.status(500).send("Plan name must be 20 characters or less.")
      }
      if (!plan.match(regex)) {
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

      const findPlanQuery = "SELECT * FROM plan WHERE Plan_MVP_name = ? AND Plan_app_Acronym = ? "
      const [foundPlans] = await sql.query(findPlanQuery, appName)

      if (foundPlans.length > 1) {
        return res.status(500).send("More than one plan with this name exists. Please contact an administrator.")
      }

      if (foundPlans.length === 1) {
        return res.status(500).send("Plan name exists.")
      }

      sql.query("INSERT INTO plan (Plan_MVP_name, Plan_startDate, Plan_endDate, Plan_app_Acronym) VALUES (?, ?, ?, ?)", [planName, startDate, endDate, appName], function (err, results) {
        if (err) {
          console.log(err)
        } else {
          res.status(200).send("Successfully created plan.")
        }
      })
    } else {
      return res.status(500).send("Plan name missing.")
    }
  } catch (err) {
    console.log(err)
  }
}

export const editPlan = async (req, res) => {
  //be careful with naming
  try {
    const { appName, planName, startDate, endDate } = req.body

    const startArr = new Date(startDate)
    const endArr = new Date(endDate)

    if (!startDate) return res.status(500).send("Start date missing.")
    if (!endDate) return res.status(500).send("End date missing.")

    if (startDate && endDate && startArr > endArr) {
      return res.status(500).send("Start date cannot be after end date.")
    }

    database.query("UPDATE plan SET Plan_startDate = ?, Plan_endDate = ? WHERE Plan_MVP_name = ? AND Plan_app_Acronym = ? ", [startDate, endDate, planName, appName], function (err, results) {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("Successfully edited plan.")
      }
    })
    res.end()
  } catch (err) {
    console.log(err)
  }
}
