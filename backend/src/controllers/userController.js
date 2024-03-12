import bcrypt from "bcryptjs"

import sql from "../config/query.js"

export const getAllUsers = async (req, res) => {
  const findAllQry = `SELECT * FROM tmsdatabase.accounts;`
  try {
    const [users] = await sql
      .query(findAllQry)
      .then(results => {
        // Handle results here
        //console.log(results); // Make sure it logs the array of 2 users
        return results
      })
      .catch(error => {
        console.error("Error:", error)
      })
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const getUser = async (req, res) => {
  const getUserByIdQry = `SELECT * FROM \`accounts\` WHERE \`username\`='${req.byUser}';`
  try {
    const [users] = await sql.query(getUserByIdQry)
    res.status(200).json(users[0])

    if (users.length < 1) {
      res.status(500).json("No users found")
    }
    if (users.length > 1) {
      res.status(500).json("More than one row found")
    }

    // one or no rows should be returned
  } catch (err) {
    console.log(err)
    res.status(500).json("Failed to get user by ID")
  }
}

export const adminUpdateUser = async (req, res) => {
  let { username, password, email, isActive, groups } = req.body

  // verify fits constraints
  const usernameMeetsConstraints = new RegExp("^[a-zA-Z0-9]+$").test(username) && username.length >= 3 && username.length <= 20

  if (!usernameMeetsConstraints) {
    return res.status(500).json("Invalid username.")
  }

  //proper constraint check refer to this
  const passwordMeetsConstraints = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^?/&*])[a-zA-Z0-9!@#$%^?/&*]").test(password) && password.length >= 8 && password.length <= 10

  if (password && password != "" && !passwordMeetsConstraints) {
    return res.status(500).json("Invalid password.")
  }

  var emailMeetsConstraints = true

  if (email !== "") {
    emailMeetsConstraints = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$").test(email)
  }

  if (!emailMeetsConstraints) {
    return res.status(500).json("Invalid email.")
  }

  // admin cannot be deleted, check if admin
  if (username === "admin") {
    if (!groups) {
      return res.status(500).json("Admin cannot be disabled or removed from the admin group.")
    }
    if (isActive === false || !groups.split(",").includes("admin")) {
      return res.status(500).json("Admin cannot be disabled or removed from the admin group.")
    }
  }

  var foundUser = null

  const getUserByIdQry = `SELECT * FROM \`accounts\` WHERE \`username\`='${username}';`
  try {
    const [foundUsers] = await sql.query(getUserByIdQry)

    if (foundUsers.length < 1) {
      return res.status(500).json("Server error: no matching user found.")
    }
    if (foundUsers.length > 1) {
      return res.status(500).json("Server error: more than one row found.")
    }
    // one or no rows should be returned
    foundUser = foundUsers
  } catch (err) {
    console.log(err)
    return res.status(500).json("Failed to get user by ID")
  }

  // password will not be updated if not provided
  password = password ? bcrypt.hashSync(password, bcrypt.genSaltSync(10)) : foundUser[0].password

  groups = Array.isArray(groups) && groups.length !== 0 ? groups.join(",") : groups //if any change to groups, update groups

  // update user
  // await adminEditUser({
  //   username,
  //   password,
  //   email,
  //   isActive,
  //   groups
  // })

  var updateUserQry = null
  if (!groups) updateUserQry = `UPDATE \`accounts\` SET \`password\`='${password ? password : foundUsers[0].password}', \`email\`='${email ? email : foundUsers[0].email}', \`isActive\`='${isActive ? 1 : 0}', \`groups\`=NULL WHERE \`username\`='${username}';`
  else updateUserQry = `UPDATE \`accounts\` SET \`password\`='${password ? password : foundUsers[0].password}', \`email\`='${email ? email : foundUsers[0].email}', \`isActive\`='${isActive ? 1 : 0}', \`groups\`='${groups}' WHERE \`username\`='${username}';`

  try {
    const updatedUser = await sql.query(updateUserQry)
    if (updatedUser[0].affectedRows !== 1) {
      return res.status(500).json("Server error: more than one row affected.")
    }
    return res.status(200).json("Successfully updated user.")
  } catch (err) {
    console.log(err)
    return res.status(500).json("failed to update user info")
  }
}

// check this
export const adminCreateUser = async (req, res) => {
  let { username, password, email, groups } = req.body

  var user = null
  // verify username does not exist in db

  try {
    const [foundUsers] = await sql.query(`SELECT * FROM accounts WHERE username= ? ;`, username)

    // multiple results found,
    // should not happen in db as id is unique
    // fix data problem if so
    if (foundUsers.length >= 1) {
      return res.status(500).json("Server error: Multiple entries with this username found.")
    }
    if (foundUsers.length === 1) {
      return res.status(500).json("Username already exists.")
    }
  } catch (err) {
    console.log(err)
    res.status(500).json("Server error: Error checking db for existing user.")
  }

  // verify fits constraints
  const usernameMeetsConstraints = new RegExp("^[a-zA-Z0-9]+$").test(username) && username.length >= 3 && username.length <= 20

  if (!usernameMeetsConstraints) {
    return res.status(500).json("Invalid username")
  }

  const passwordMeetsConstraints = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^?/&*])[a-zA-Z0-9!@#$%^?/&*]").test(password) && password.length >= 8 && password.length <= 10

  if (!passwordMeetsConstraints) {
    return res.status(500).json("Invalid password")
  }

  var emailMeetsConstraints = true

  if (email !== "") {
    emailMeetsConstraints = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$").test(email)
  }

  if (!emailMeetsConstraints) {
    return res.status(500).json("Invalid email.")
  }

  //hash pw
  password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  var createUserQry = ""

  // update user
  try {
    if (!groups) {
      createUserQry = `
    INSERT INTO accounts (\`username\`, \`password\`, \`email\`) values ('${username}', '${password}', '${email}');`
    } else {
      createUserQry = `
    INSERT INTO accounts (\`username\`, \`password\`, \`email\`, \`groups\`) values ('${username}', '${password}', '${email}', '${groups}');`
    }
    //console.log(createUserQry)
    const createdUser = await sql.query(createUserQry)

    if (createdUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected")
    }

    return res.status(200).json("Created user")
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  // const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 })
  // res.cookie("jwt_error", token, { maxAge: 3600000 })
}

export const updateUser = async (req, res) => {
  try {
    // admin cannot be deleted, check if admin
    let { password, email } = req.body

    // get which user is requesting
    const username = req.byUser

    //console.log(req.body)
    // verify fits constraints
    const passwordMeetsConstraints = password && password != "" && new RegExp("^(?=.*[0-9])(?=.*[!@#$%^?/&*])[a-zA-Z0-9!@#$%^?/&*]").test(password) && password.length >= 8 && password.length <= 10
    //console.log("pw clear: " + passwordMeetsConstraints)

    if (!passwordMeetsConstraints && password) {
      return res.status(500).json("Invalid password.")
    }

    const emailMeetsConstraints = email && email != "" && new RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$").test(email)
    //console.log("email clear: " + emailMeetsConstraints)

    if (!emailMeetsConstraints && email) {
      return res.status(500).json("Invalid email.")
    }

    var foundUser = null
    try {
      const [users] = await sql.query(`SELECT * FROM accounts WHERE username='${username}';`)

      if (users.length < 1) {
        return res.status(500).json("No users found") //should display on frontend as "System error: contact an admin"
      }
      if (users.length > 1) {
        return res.status(500).json("More than one row found") //should display on frontend as "System error: contact an admin"
      }

      foundUser = users[0]
    } catch (err) {
      console.log(err)
      res.status(500).json("Failed to get user by ID")
    }

    //hash pw
    password = password ? bcrypt.hashSync(password, bcrypt.genSaltSync(10)) : foundUser.password //check for blank field, hash pw

    email = email ? email : foundUser.email //check for blank field

    const updateUserQry = `UPDATE tmsdatabase.accounts SET password = ? , email = ? WHERE username = ?`

    const updatedUser = await sql.query(updateUserQry, [password, email, foundUser.username])
    if (updatedUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected")
    }
    res.status(200).json("Successfully updated your details.")
  } catch (err) {
    //console.log(err)
    res.status(500).json("user update self query failed.")
  }
}

export const getAllPermitDoneEmails = async group => {
  try {
    const results = await sql.query(`SELECT * FROM accounts WHERE isActive = 1 AND accounts.groups LIKE ?`, ["%" + group + "%"])
    return results
  } catch (err) {
    console.log(err)
  }
}
